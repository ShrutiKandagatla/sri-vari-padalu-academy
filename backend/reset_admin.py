import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from auth import get_password_hash

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def reset_admin():
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']
    print(f"Connecting to MongoDB at: {mongo_url}")
    print(f"Using database: {db_name}")
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Check if admin exists
    admin = await db.users.find_one({"username": "admin"})
    
    new_hashed_password = get_password_hash("admin123")
    
    if admin:
        print("Found existing 'admin' user. Resetting password to 'admin123'...")
        await db.users.update_one(
            {"username": "admin"},
            {"$set": {
                "hashed_password": new_hashed_password,
                "email": "admin@srivaripadalu.dance",
                "is_admin": True
            }}
        )
        print("✓ Password reset successful!")
    else:
        print("No 'admin' user found. Creating new 'admin' user...")
        from models import User
        admin_user = User(
            username="admin",
            email="admin@srivaripadalu.dance",
            hashed_password=new_hashed_password,
            is_admin=True
        )
        await db.users.insert_one(admin_user.dict())
        print("✓ Created new admin user successfully!")
        
    client.close()

if __name__ == "__main__":
    asyncio.run(reset_admin())
