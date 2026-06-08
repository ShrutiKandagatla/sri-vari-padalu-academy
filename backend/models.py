from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid


# User Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: EmailStr
    hashed_password: str
    is_admin: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# Event Models
class EventBase(BaseModel):
    title: str
    date: str
    time: str
    venue: str
    description: str
    type: str  # performance, workshop, camp, registration


class EventCreate(EventBase):
    pass


class EventUpdate(EventBase):
    pass


class Event(EventBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


# Gallery Models
class GalleryImageBase(BaseModel):
    url: str
    alt: str


class GalleryImageCreate(GalleryImageBase):
    pass


class GalleryImage(GalleryImageBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)


# Contact Models
class ContactBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str


class ContactCreate(ContactBase):
    pass


class Contact(ContactBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = False
