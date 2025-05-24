# 🍲 Recipe API Backend

This Flask backend provides RESTful endpoints to serve recipe data with filtering, pagination, and sorting support. It connects to a MongoDB database and is designed to be used with a React frontend.

---

## 🚀 Features

- Fetch all recipes with pagination and sorting.
- Search recipes using flexible filters (`title`, `cuisine`, `rating`, `total_time`, `nutrients.calories`).
- CORS enabled for frontend integration.

---


## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Jenesha20/backend.git
cd backend
````


### 2. Configure Environment Variables

Edit `config.py` with your MongoDB URI and database settings:

```python
class .env:
   MONGO_URI=mongodb://localhost:27017/
   DATABASE_NAME=recipes_db
   RECIPES_COLLECTION=recipes
```

---

## ▶️ Running the App

```bash
python app.py
```

By default, it runs on:

```
http://127.0.0.1:5000
```

---

## 🔌 API Endpoints


## 🧾 Sample Recipe Document

```json
{
  "title": "Spaghetti Bolognese",
  "cuisine": "Italian",
  "rating": 4.8,
  "prep_time": 15,
  "cook_time": 30,
  "total_time": 45,
  "description": "Classic meat sauce pasta recipe.",
  "serves": "4 people",
  "nutrients": {
    "calories": "450 kcal",
    "carbohydrateContent": "50g",
    "cholesterolContent": "60mg",
    "fiberContent": "4g",
    "proteinContent": "25g",
    "saturatedFatContent": "8g",
    "sodiumContent": "300mg",
    "sugarContent": "6g",
    "fatContent": "15g"
  }
}
```

### GET `/api/recipes`

**Description:** Returns paginated list of all recipes.

**Query Parameters:**

| Param | Type   | Description                         |
| ----- | ------ | ----------------------------------- |
| page  | int    | Page number (default = 1)           |
| limit | int    | Results per page (default = 10)     |
| sort  | string | Field to sort by (default = rating) |

**Example:**

```
GET /api/recipes?page=1&limit=1
## 📦 Sample Responses

### `/api/recipes`

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
    }
  ]
}
```

---

### GET `/api/recipes/search`

**Description:** Filter recipes based on title, cuisine, rating, total\_time, and calories.

**Supported Filters:**

| Field       | Type   | Supports Comparisons             |
| ----------- | ------ | -------------------------------- |
| title       | string | Partial match                    |
| cuisine     | string | Exact match                      |
| rating      | number | `<`, `>`, `<=`, `>=`, `=`        |
| total\_time | number | `<`, `>`, `<=`, `>=`, `=`        |
| calories    | number | `<`, `>`, `<=`, `>=`, `=`        |

**Example:**

```
GET /api/recipes/search?title=spaghetti&rating=>4&calories=<500
```

---

## 📦 Sample Responses
### `/api/recipes/search`

```json
{
  "data": [
    {
      "title": "Spaghetti Bolognese",
      "cuisine": "Italian",
      "rating": 4.8,
      "total_time": 45,
      "serves": "4 people",
      "description": "Classic meat sauce pasta recipe.",
      "prep_time": 15,
      "cook_time": 30,
      "nutrients": {
        "calories": "450 kcal",
        "carbohydrateContent": "50g",
        "cholesterolContent": "60mg",
        "fiberContent": "4g",
        "proteinContent": "25g",
        "saturatedFatContent": "8g",
        "sodiumContent": "300mg",
        "sugarContent": "6g",
        "fatContent": "15g"
      }
    }
  ]
}
```

---

## 🌐 CORS

Make sure to enable CORS for frontend access. This is done in `app.py`:

```python
from flask_cors import CORS
CORS(app)
```

---






