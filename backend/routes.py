from fastapi import APIRouter, HTTPException, Depends, status, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorDatabase
from models import (
    Event, EventCreate, EventUpdate,
    GalleryImage, GalleryImageCreate,
    Contact, ContactCreate,
    User, UserLogin, Token
)
from auth import (
    get_password_hash, verify_password, create_access_token, get_current_user
)
from typing import List
from datetime import datetime
import os
import uuid
from pathlib import Path

router = APIRouter()


# Dependency to get database
async def get_db():
    from server import db
    return db


# Authentication Routes
@router.post("/auth/login", response_model=Token)
async def login(user_login: UserLogin, database: AsyncIOMotorDatabase = Depends(get_db)):
    """Admin login endpoint"""
    user = await database.users.find_one({"username": user_login.username})
    
    if not user or not verify_password(user_login.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/auth/logout")
async def logout():
    """Logout endpoint (client should delete the token)"""
    return {"message": "Successfully logged out"}


@router.get("/auth/verify")
async def verify_auth(current_user: str = Depends(get_current_user)):
    """Verify if the user is authenticated"""
    return {"username": current_user, "authenticated": True}


# Event Routes
@router.get("/events", response_model=List[Event])
async def get_events(database: AsyncIOMotorDatabase = Depends(get_db)):
    """Get all events (public)"""
    events = await database.events.find().sort("date", 1).to_list(100)
    return [Event(**event) for event in events]


@router.post("/events", response_model=Event, status_code=status.HTTP_201_CREATED)
async def create_event(
    event: EventCreate,
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Create a new event (protected)"""
    event_obj = Event(**event.dict())
    await database.events.insert_one(event_obj.dict())
    return event_obj


@router.put("/events/{event_id}", response_model=Event)
async def update_event(
    event_id: str,
    event: EventUpdate,
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Update an event (protected)"""
    existing_event = await database.events.find_one({"id": event_id})
    if not existing_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    event_data = event.dict()
    event_data["updated_at"] = datetime.utcnow()
    
    await database.events.update_one(
        {"id": event_id},
        {"$set": event_data}
    )
    
    updated_event = await database.events.find_one({"id": event_id})
    return Event(**updated_event)


@router.delete("/events/{event_id}")
async def delete_event(
    event_id: str,
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete an event (protected)"""
    result = await database.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted successfully"}


# Gallery Routes
@router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery_images(database: AsyncIOMotorDatabase = Depends(get_db)):
    """Get all gallery images (public)"""
    images = await database.gallery.find().sort("created_at", -1).to_list(100)
    return [GalleryImage(**image) for image in images]


@router.post("/gallery", response_model=GalleryImage, status_code=status.HTTP_201_CREATED)
async def add_gallery_image(
    image: GalleryImageCreate,
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Add a new gallery image (protected)"""
    image_obj = GalleryImage(**image.dict())
    await database.gallery.insert_one(image_obj.dict())
    return image_obj


@router.post("/gallery/upload", response_model=GalleryImage, status_code=status.HTTP_201_CREATED)
async def upload_gallery_image(
    file: UploadFile = File(...),
    alt: str = "Gallery image",
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Upload an image file to gallery (protected)"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only JPEG, PNG, WebP and GIF are allowed."
        )
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    
    # Save file
    ROOT_DIR = Path(__file__).parent
    upload_dir = ROOT_DIR / "static" / "uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)
    file_path = upload_dir / unique_filename
    
    # Write file
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    # Get backend URL from environment
    backend_url = os.environ.get('BACKEND_URL', 'http://localhost:8001')
    # Create full URL for the image using API uploads endpoint
    image_url = f"{backend_url}/api/uploads/{unique_filename}"
    
    # Create gallery image entry
    image_obj = GalleryImage(url=image_url, alt=alt)
    await database.gallery.insert_one(image_obj.dict())
    
    return image_obj


@router.delete("/gallery/{image_id}")
async def delete_gallery_image(
    image_id: str,
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a gallery image (protected)"""
    result = await database.gallery.delete_one({"id": image_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted successfully"}


# Contact Routes
@router.post("/contact", response_model=Contact, status_code=status.HTTP_201_CREATED)
async def create_contact(
    contact: ContactCreate,
    database: AsyncIOMotorDatabase = Depends(get_db)
):
    """Submit contact form (public)"""
    contact_obj = Contact(**contact.dict())
    await database.contacts.insert_one(contact_obj.dict())
    return contact_obj


@router.get("/contact", response_model=List[Contact])
async def get_contacts(
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all contact inquiries (protected)"""
    contacts = await database.contacts.find().sort("created_at", -1).to_list(100)
    return [Contact(**contact) for contact in contacts]


@router.delete("/contact/{contact_id}")
async def delete_contact(
    contact_id: str,
    database: AsyncIOMotorDatabase = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a contact inquiry (protected)"""
    result = await database.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}
