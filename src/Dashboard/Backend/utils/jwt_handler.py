from datetime import datetime, timedelta
import jwt

SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"


def create_token(data: dict, expires_minutes: int = 60):
    payload = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    payload.update({"exp": expire})

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)