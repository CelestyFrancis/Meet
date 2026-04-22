from app.db import connect_db

PREBUILT_USERS = [
    {'id': 1, 'username': 'Alice',  'email': 'alice@meet.com',  'password': 'alice123'},
    {'id': 2, 'username': 'Bob',    'email': 'bob@meet.com',    'password': 'bob123'},
    {'id': 3, 'username': 'Carol',  'email': 'carol@meet.com',  'password': 'carol123'},
    {'id': 4, 'username': 'David',  'email': 'david@meet.com',  'password': 'david123'},
]


def seed_users():
    with connect_db() as db:
        with db.cursor() as cursor:
            for u in PREBUILT_USERS:
                cursor.execute(
                    "INSERT INTO accounts (id, name, email, password) VALUES (%s, %s, %s, %s) "
                    "ON CONFLICT DO NOTHING",
                    (u['id'], u['username'], u['email'], u['password'])
                )
        db.commit()


def login_user(user_email, password):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "SELECT id, name, password FROM accounts WHERE email = %s",
                (user_email,)
            )
            result = cursor.fetchone()
    if result and result[2] == password:
        return result
    return None
