import jwt
import datetime

secret_key = "secret"
algorithm = "HS256"


def create_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=45)
    }
    return jwt.encode(payload, secret_key, algorithm)


def is_token_valid(token):
    try:
        return jwt.decode(token, key=secret_key, algorithms=[algorithm])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None
