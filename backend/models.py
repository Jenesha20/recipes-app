from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client[Config.DATABASE_NAME]
recipes_collection = db[Config.RECIPES_COLLECTION]

if Config.RECIPES_COLLECTION not in db.list_collection_names():
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
