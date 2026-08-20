FROM python:3.13-slim

# Install system dependencies including GDAL for PostGIS support
RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin \
    libgdal-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install uv for fast package management
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies using uv
RUN uv sync --frozen

# Copy the rest of the application
COPY . .

# Expose the Django server port
EXPOSE 8000

# Run the Django development server using uv
CMD ["sh", "-c", "uv run manage.py makemigrations && uv run manage.py migrate && uv run manage.py runserver 0.0.0.0:8000"]
