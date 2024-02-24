from app.db import connect_db


def login_user(user_email, password):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute("SELECT id,name,password FROM accounts WHERE email = %s", (user_email,))
            result = cursor.fetchone()
    if result:
        if result[2] == password:
            return result
    return False
