# 🍽️ Recipes Frontend (React)

A modern React-based frontend to display, filter, and explore recipes using a RESTful API backend.

---

## 🚀 Features

- Fetch and display recipes in a responsive table layout
- Column-level search with backend filtering (`/search`)
- Expandable drawer for detailed recipe view
- Nutrition facts displayed in a structured table
- Pagination with customizable results per page (15 to 50)

---

## 🛠️ Technologies Used

- React 
- Axios for HTTP requests


---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Jenesha20/frontend.git
cd frontend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the project root:

```env
REACT_APP_API_BASE=http://127.0.0.1:5000/api/recipes
```

If not set, the frontend will use `http://127.0.0.1:5000/api/recipes` by default.

---

## ▶️ Run Locally

```bash
npm start
```

Access the frontend at: `http://localhost:3000`

---


