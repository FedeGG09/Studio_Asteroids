# 1. Base ligera con Python
FROM python:3.12-slim

# 2. No buffers en salida (logs inmediato)
ENV PYTHONUNBUFFERED=1

# 3. Directorio de trabajo
WORKDIR /app

# 4. Copiá e instalá dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiá el resto del proyecto
COPY . .

# 6. Exponé el puerto que usa Cloud Run
EXPOSE 8080

# 7. Comando por defecto: Uvicorn sirviendo tu FastAPI app
#    - Asume que tu servidor está en server.py y la instancia se llama `app`
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-8080}"]
