import jwt
import datetime

SECRET_KEY = "mysecretkey"

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(hours=2)

    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")