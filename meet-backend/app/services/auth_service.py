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

def register_user(user_name, user_email, password):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute("INSERT INTO accounts (name,password,email) VALUES (%s, %s,%s)", (user_name, password, user_email,))



def get_user( user_email):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute("SELECT id,name,password FROM accounts WHERE email = %s", (user_email,))
            result = cursor.fetchone()
    if result:
            return result
    return False