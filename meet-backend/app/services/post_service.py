from app.db import connect_db

_SELECT = (
    "SELECT posts.id, accounts.name, posts.title, posts.content, "
    "posts.created_at, posts.author_id "
    "FROM accounts JOIN posts ON accounts.id = posts.author_id "
)


def _to_dict(row):
    return {
        'id': row[0],
        'authorName': row[1],
        'title': row[2],
        'content': row[3],
        'createdAt': row[4].isoformat(),
        'authorId': row[5],
    }


def create_post(title, content, author_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "INSERT INTO posts (title, content, author_id) VALUES (%s, %s, %s)",
                (title, content, author_id)
            )
        db.commit()
    return True


def get_posts():
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(_SELECT + "ORDER BY posts.created_at DESC")
            rows = cursor.fetchall()
    return [_to_dict(r) for r in rows]


def get_user_posts(author_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                _SELECT + "WHERE posts.author_id = %s ORDER BY posts.created_at DESC",
                (author_id,)
            )
            rows = cursor.fetchall()
    return [_to_dict(r) for r in rows]


def update_post(post_id, author_id, title, content):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "UPDATE posts SET title = %s, content = %s WHERE id = %s AND author_id = %s",
                (title, content, post_id, author_id)
            )
            updated = cursor.rowcount
        db.commit()
    return updated > 0


def delete_post(post_id, author_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "DELETE FROM posts WHERE id = %s AND author_id = %s",
                (post_id, author_id)
            )
            deleted = cursor.rowcount
        db.commit()
    return deleted > 0
