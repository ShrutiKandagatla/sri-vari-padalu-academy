"""
Initialize database with admin user and seed data
Run this script once to set up the database
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from auth import get_password_hash
from models import User, Event, GalleryImage
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def init_db():
    # Connect to MongoDB
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    print("Initializing database...")
    
    # Create admin user
    existing_admin = await db.users.find_one({"username": "admin"})
    if not existing_admin:
        admin_user = User(
            username="admin",
            email="admin@srivaripadalu.dance",
            hashed_password=get_password_hash("admin123"),
            is_admin=True
        )
        await db.users.insert_one(admin_user.dict())
        print("✓ Admin user created (username: admin, password: admin123)")
    else:
        print("✓ Admin user already exists")
    
    # Seed events from mockData
    events_data = [
        {
            "title": "Annual Arangetram Ceremony",
            "date": "2025-02-15",
            "time": "6:00 PM - 9:00 PM",
            "venue": "Ravindra Bharathi Auditorium, Hyderabad",
            "description": "Witness our senior students present their debut solo performances",
            "type": "performance"
        },
        {
            "title": "Bharatnatyam Workshop with Guru Smt. Lakshmi Devi",
            "date": "2025-03-10",
            "time": "10:00 AM - 4:00 PM",
            "venue": "Academy Main Hall",
            "description": "Intensive workshop on advanced adavus and abhinaya techniques",
            "type": "workshop"
        },
        {
            "title": "Summer Dance Camp",
            "date": "2025-04-05",
            "time": "9:00 AM - 1:00 PM",
            "venue": "Academy Campus",
            "description": "Two-week intensive program for beginners and intermediate students",
            "type": "camp"
        },
        {
            "title": "Kuchipudi Performance - Natyanjali Festival",
            "date": "2025-04-20",
            "time": "7:00 PM - 9:00 PM",
            "venue": "Chidambaram Temple, Tamil Nadu",
            "description": "Our academy troupe performs at the prestigious Natyanjali festival",
            "type": "performance"
        },
        {
            "title": "New Batch Registration Opens",
            "date": "2025-05-01",
            "time": "All Day",
            "venue": "Academy Office",
            "description": "Enrollments open for beginners (age 5+) in Bharatnatyam & Kuchipudi",
            "type": "registration"
        }
    ]
    
    event_count = await db.events.count_documents({})
    if event_count == 0:
        for event_data in events_data:
            event = Event(**event_data)
            await db.events.insert_one(event.dict())
        print(f"✓ Seeded {len(events_data)} events")
    else:
        print(f"✓ Events already exist ({event_count} events)")
    
    # Seed gallery images
    gallery_data = [
        {
            "url": "https://images.pexels.com/photos/34717625/pexels-photo-34717625.jpeg?cs=srgb&dl=pexels-atelierbyvineeth-34717625.jpg&fm=jpg",
            "alt": "Classical dance performance 1"
        },
        {
            "url": "https://images.pexels.com/photos/20695757/pexels-photo-20695757.jpeg?cs=srgb&dl=pexels-renjithponnappan-20695757.jpg&fm=jpg",
            "alt": "Classical dance performance 2"
        },
        {
            "url": "https://images.unsplash.com/photo-1634566520253-c6b8f84a0f60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHx0cmFkaXRpb25hbCUyMGRhbmNlfGVufDB8fHx8MTc3MjUxNzM0OHww&ixlib=rb-4.1.0&q=85",
            "alt": "Traditional dance pose 1"
        },
        {
            "url": "https://images.unsplash.com/photo-1585302397841-b42e837d0d81?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHx0cmFkaXRpb25hbCUyMGRhbmNlfGVufDB8fHx8MTc3MjUxNzM0OHww&ixlib=rb-4.1.0&q=85",
            "alt": "Traditional dance pose 2"
        },
        {
            "url": "https://images.unsplash.com/photo-1666587128445-4623f8f8f033?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGRhbmNlfGVufDB8fHx8MTc3MjUxNzM0OHww&ixlib=rb-4.1.0&q=85",
            "alt": "Traditional dance pose 3"
        },
        {
            "url": "https://images.pexels.com/photos/28952208/pexels-photo-28952208.jpeg?cs=srgb&dl=pexels-anubhav24-28952208.jpg&fm=jpg",
            "alt": "Cultural dance performance 1"
        },
        {
            "url": "https://images.pexels.com/photos/28867654/pexels-photo-28867654.jpeg?cs=srgb&dl=pexels-roman-saienko-1867764487-28867654.jpg&fm=jpg",
            "alt": "Cultural dance performance 2"
        },
        {
            "url": "https://images.pexels.com/photos/19135138/pexels-photo-19135138.jpeg?cs=srgb&dl=pexels-kolkatarchobiwala-19135138.jpg&fm=jpg",
            "alt": "Traditional performance 1"
        },
        {
            "url": "https://images.pexels.com/photos/33311192/pexels-photo-33311192.jpeg?cs=srgb&dl=pexels-suhashanjar-33311192.jpg&fm=jpg",
            "alt": "Traditional performance 2"
        },
        {
            "url": "https://images.unsplash.com/photo-1663575127044-aa77b11bb5d3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHwxfHxCaGFyYXRuYXR5YW0lMjBkYW5jZXJ8ZW58MHx8fHwxNzcyNTE3MzMyfDA&ixlib=rb-4.1.0&q=85",
            "alt": "Classical Bharatnatyam dancer"
        }
    ]
    
    gallery_count = await db.gallery.count_documents({})
    if gallery_count == 0:
        for img_data in gallery_data:
            image = GalleryImage(**img_data)
            await db.gallery.insert_one(image.dict())
        print(f"✓ Seeded {len(gallery_data)} gallery images")
    else:
        print(f"✓ Gallery images already exist ({gallery_count} images)")
    
    print("\n✅ Database initialization complete!")
    print("\nAdmin Credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print("\n⚠️  Please change the admin password after first login!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(init_db())
