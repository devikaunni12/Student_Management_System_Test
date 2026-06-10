# School Management System (Backend)

## Project overview
This is the Django + Django REST Framework (DRF) backend for a School Management System.

It provides:
- Token-based authentication using DRF TokenAuth
- Student CRUD APIs
- CORS enabled for development
- Default admin user creation via a management command

## Tech stack
- Python 3.x
- Django
- Django REST Framework (DRF)
- DRF Token Authentication
- django-cors-headers
- SQLite (default Django database)

## Backend setup steps

### 1) Create a virtual environment
From `school_backend/`:

```bash
python -m venv venv
```

Activate it:

**Windows (cmd):**
```bash
venv\Scripts\activate
```

### 2) Install dependencies
```bash
pip install -r requirements.txt
```

### 3) Make migrations
```bash
django-admin makemigrations
python manage.py migrate
```

### 4) Create default superuser
This command creates (or ensures) the default admin user:

```bash
python manage.py create_default_user
```

Default credentials:
- username: `admin`
- password: `admin123`

### 5) Run the server
```bash
python manage.py runserver
```

Backend runs on:
- http://127.0.0.1:8000

## Default login credentials
- Username: `admin`
- Password: `admin123`

## API endpoint list
All student endpoints require an auth token.

### Authentication
- **POST** `/api/login`
  - Body (JSON): `{ "username": "...", "password": "..." }`
  - Returns: `{ "token": "..." }`

### Students
All student endpoints require auth.

- **GET** `/api/students/`
  - Returns a list of students

- **POST** `/api/students/`
  - Creates a new student

- **GET** `/api/students/{id}/`
  - Returns a single student

- **PUT** `/api/students/{id}/`
  - Updates a student

- **DELETE** `/api/students/{id}/`
  - Deletes a student

## Folder structure
- `school_backend/`
  - `school_backend/`: Django project config (settings/urls)
  - `students/`: Student app (models/serializers/views/urls + management command)

## Deployment notes
For production deployment:
- Set `DEBUG=False`
- Configure proper CORS origins (don’t allow all)
- Use a real database instead of SQLite
- Consider JWT authentication instead of DRF TokenAuth for scalability

