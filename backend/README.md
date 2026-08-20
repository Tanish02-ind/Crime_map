# Backend (Django API)

## Prerequisites
- Python 3.13+
- [uv](https://github.com/astral-sh/uv) (Extremely fast Python package installer and resolver)
- PostgreSQL with PostGIS extension

## Setup

1. **Install Dependencies:**
   ```bash
   uv sync
   ```

2. **Environment Variables:**
   Ensure your PostgreSQL database is running. By default, the app looks for:
   - `POSTGRES_DB=crime_map`
   - `POSTGRES_USER=postgres`
   - `POSTGRES_PASSWORD=password`
   - `POSTGRES_HOST=localhost`
   - `POSTGRES_PORT=5432`

3. **Apply Migrations:**
   ```bash
   uv run manage.py makemigrations accounts
   uv run manage.py migrate
   ```

4. **Create Superuser (Optional):**
   ```bash
   uv run manage.py createsuperuser
   ```

5. **Run the Development Server:**
   ```bash
   uv run manage.py runserver
   ```
   The API will be available at `http://localhost:8000`.

## Docker
You can also run the backend via Docker Compose from the root directory:
```bash
docker-compose up backend
```
