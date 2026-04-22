from app.db import connect_db


def add_notification(user_id, type_, message):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "INSERT INTO notifications (user_id, type, message) VALUES (%s, %s, %s)",
                (user_id, type_, message)
            )
        db.commit()


def get_notifications(user_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "SELECT id, type, message, read, created_at FROM notifications "
                "WHERE user_id = %s ORDER BY created_at DESC",
                (user_id,)
            )
            rows = cursor.fetchall()
    return [
        {'id': r[0], 'type': r[1], 'message': r[2], 'read': r[3], 'createdAt': r[4].isoformat()}
        for r in rows
    ]


def mark_read(user_id, notif_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "UPDATE notifications SET read = TRUE WHERE id = %s AND user_id = %s",
                (notif_id, user_id)
            )
        db.commit()


def mark_all_read(user_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "UPDATE notifications SET read = TRUE WHERE user_id = %s",
                (user_id,)
            )
        db.commit()


def clear_all(user_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "DELETE FROM notifications WHERE user_id = %s",
                (user_id,)
            )
        db.commit()
