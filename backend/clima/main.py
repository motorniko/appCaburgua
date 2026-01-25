from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.get("/clima")
def obtener_clima():
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Falta la API Key en el backend")

    params = {
        "q": "Caburgua,CL",  # Usar nombre ciudad
        "appid": API_KEY,
        "units": "metric",
        "lang": "es"
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        return {
            "ciudad": data.get("name", "Caburgua"),
            "temperatura": data["main"]["temp"],
            "descripcion": data["weather"][0]["description"],
            "icono": data["weather"][0]["icon"]
        }
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Error al consultar la API: {e}")

