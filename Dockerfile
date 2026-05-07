# 1. Use an official Python image as our base
FROM python:3.10-slim

# 2. Set the 'Home' folder inside the container
WORKDIR /app

# 3. Copy our list of tools and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy the actual backend code and the secret keys
COPY ./app ./app
COPY ./.env ./.env

# 5. Create empty folders for our data and library
RUN mkdir -p data vector_store

# 6. Open the 'Window' (Port 8000) for communication
EXPOSE 8000

# 7. The command that starts the server when the container turns on
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
