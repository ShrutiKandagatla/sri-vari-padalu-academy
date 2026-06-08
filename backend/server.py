from fastapi import FastAPI, APIRouter
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Srivari Padalu Dance Academy API"}

# Serve uploaded images through API endpoint
@api_router.get("/uploads/{filename}")
async def serve_upload(filename: str):
    file_path = ROOT_DIR / "static" / "uploads" / filename
    if not file_path.exists():
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="File not found")
    
    # Determine media type based on extension
    ext = filename.split('.')[-1].lower()
    media_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp'
    }
    media_type = media_types.get(ext, 'image/jpeg')
    
    return FileResponse(file_path, media_type=media_type)

# Import and include routes
from routes import router as api_routes
api_router.include_router(api_routes)

# Include the router in the main app
app.include_router(api_router)

# Configure CORS
cors_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://mudra-events.preview.emergentagent.com"
]

# Configure CORS
cors_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://mudra-events.preview.emergentagent.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
