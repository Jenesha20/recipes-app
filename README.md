Sure! Here's your updated README file with the **MongoDB schema details** included in a simple way at the end. I've placed it under a new section **Database Schema** for clarity:

---

```markdown
# 🍽️ Recipe API - Fullstack App (Flask + React)

A fullstack project to load, store, search, and view recipes using a Flask backend (with MongoDB) and a React frontend.

---

## 📦 Features

### Backend (Flask + MongoDB)
- Load recipe data from a JSON file
- Store and query in MongoDB
- RESTful APIs:
  - `/api/recipes` – Get all recipes with pagination
  - `/api/recipes/search` – Search recipes with filters (title, cuisine, rating, etc.)

### Frontend (React)
- Displays recipes in a table
- Search & filter per column using API
- Click a recipe row to view details in a side drawer
- Pagination and adjustable items per page
- Fallback screens for no data or no results

---

## ⚙️ Setup Instructions

### 1. Backend

#### 📁 Requirements
- Python 3.x
- MongoDB 

#### 🔧 Steps

#### 🔑 Configure `config.py`

```

MONGO\_URI=mongodb://localhost:27017
DATABASE\_NAME=recipes\_db

````

#### ▶️ Run the Backend

```bash
python app.py
````

API Base URL: `http://127.0.0.1:5000`

#### 🍴 Insert Recipes

```python
# One-time script to insert JSON data
from pymongo import MongoClient
import json

client = MongoClient("mongodb://localhost:27017")
db = client['recipes_db']
with open("../US_recipes_null (1).json", "r") as f:
    db.recipes.insert_many(json.load(f))
```

---

### 2. Frontend

#### 📁 Requirements

* Node.js + npm

#### 🔧 Steps

```bash
cd frontend
npm install
```

#### ⚙️ Configure `.env`

```
REACT_APP_API_BASE=http://127.0.0.1:5000/api/recipes
```

#### ▶️ Run the Frontend

```bash
npm start
```

Runs on: `http://localhost:3000`

---

## 🔌 Sample API Requests

### ✅ Get All Recipes

```
GET /api/recipes?page=1&limit=10
```

### ✅ Search Recipes

```
GET /api/recipes/search?title=pasta&rating=>4
```

### ✅ Example Response

```json
{
  "page": 1,
  "limit": 2,
  "total": 120,
  "data": [
    {
      "title": "Spaghetti Bolognese",
      "cuisine": "Italian",
      "rating": 4.8,
      "total_time": 45,
      "serves": "4 people"
    },
    ...
  ]
}
```

---

## 🗄️ Database Schema (MongoDB Collection: `recipes`)

Each recipe document structure:

```json
{
  "_id": ObjectId,
  "title": "String",
  "cuisine": "String",
  "description": "String",
  "rating": Number,
  "total_time": Number,          
  "prep_time": Number,           
  "cook_time": Number,           
  "serves": "String",            
  "nutrition": {
    "calories": Number,
    "carbohydrateContent": Number,
    "cholesterolContent": Number,
    "fiberContent": Number,
    "proteinContent": Number,
    "saturatedFatContent": Number,
    "sodiumContent": Number,
    "sugarContent": Number,
    "fatContent": Number
  }
}
```

---

## 🧪 API Testing

* Use browser or [Postman](https://www.postman.com/)

```bash
GET "http://127.0.0.1:5000/api/recipes/search?title=salad"
```

---

