import os
from dotenv import load_dotenv

load_dotenv()  

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
    DATABASE_NAME = os.getenv('DATABASE_NAME', 'recipes_db')
    RECIPES_COLLECTION = os.getenv('RECIPES_COLLECTION', 'recipes')
