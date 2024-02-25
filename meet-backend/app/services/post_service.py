from app.db import connect_db


def create_post(title, content, author_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute("INSERT INTO posts (title, content, author_id) VALUES (%s, %s,%s)", (title, content, author_id,))
            return True


def get_posts():
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute("SELECT posts.id, accounts.name, posts.title, posts.content, posts.created_at FROM accounts JOIN posts ON accounts.id = posts.author_id ORDER BY posts.created_at DESC;")
            posts = cursor.fetchall()
    if posts:
            return posts
    return False

def get_user_posts(user_email):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute("SELECT posts.id, accounts.name, posts.title, posts.content, posts.created_at FROM accounts JOIN posts ON accounts.id = posts.author_id WHERE accounts.email = %s ORDER BY posts.created_at DESC;",(user_email,))
            posts = cursor.fetchall()
    if posts:
            return posts
    return False
