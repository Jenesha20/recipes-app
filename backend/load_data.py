import json
from config import Config
from pymongo import MongoClient

client = MongoClient(Config.MONGO_URI)
db = client[Config.DATABASE_NAME]

if Config.RECIPES_COLLECTION in db.list_collection_names():
    db.drop_collection(Config.RECIPES_COLLECTION)

db.create_collection(Config.RECIPES_COLLECTION, validator={
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['title'],
        'properties': {
            'title': {'bsonType': 'string'},
            'cuisine': {'bsonType': 'string'},
            'rating': {'bsonType': ['double', 'null']},
            'prep_time': {'bsonType': ['int', 'null']},
            'cook_time': {'bsonType': ['int', 'null']},
            'total_time': {'bsonType': ['int', 'null']},
            'description': {'bsonType': 'string'},
            'nutrients': {'bsonType': 'object'},
            'serves': {'bsonType': 'string'}
        }
    }
})

recipes_collection = db[Config.RECIPES_COLLECTION]

with open("../US_recipes_null (1).json", "r") as f:
    recipes_data = json.load(f)

inserted = 0
for item in recipes_data.values():
    try:
        recipe = {
            "title": item.get("title"),
            "cuisine": item.get("cuisine"),
            "rating": float(item["rating"]) if isinstance(item.get("rating"), (int, float)) else None,
            "prep_time": int(item["prep_time"]) if isinstance(item.get("prep_time"), (int, float)) else None,
            "cook_time": int(item["cook_time"]) if isinstance(item.get("cook_time"), (int, float)) else None,
            "total_time": int(item["total_time"]) if isinstance(item.get("total_time"), (int, float)) else None,
            "description": item.get("description", ""),
            "nutrients": item.get("nutrients", {}),
            "serves": item.get("serves", "")
        }
        recipes_collection.insert_one(recipe)
        inserted += 1
    except Exception as e:
        print(f"Error inserting recipe : {e}")

print("Successfully inserted the data")
