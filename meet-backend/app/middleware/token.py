import jwt
import datetime

secret_key = "secret"
algorithm = "HS256"


def create_token(user_email):
    token = jwt.encode({'user': user_email, 'exp': datetime.datetime.utcnow()+ datetime.timedelta(minutes=45)}, secret_key, algorithm)
    return token

def is_token_valid(token):
    validity = jwt.decode(token, key=secret_key, algorithms=[algorithm, ])
    return validity
