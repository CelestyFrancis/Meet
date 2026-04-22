from app.db import connect_db
from app.services.notification_service import add_notification


def _get_name(cursor, user_id):
    cursor.execute("SELECT name FROM accounts WHERE id = %s", (user_id,))
    row = cursor.fetchone()
    return row[0] if row else 'Someone'


def send_request(from_id, to_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            sender_name = _get_name(cursor, from_id)
            cursor.execute(
                "INSERT INTO friend_requests (from_id, to_id) VALUES (%s, %s) ON CONFLICT DO NOTHING",
                (from_id, to_id)
            )
        db.commit()
    add_notification(to_id, 'friend_request', f'{sender_name} sent you a friend request')


def accept_request(user_id, from_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            accepter_name = _get_name(cursor, user_id)
            cursor.execute(
                "UPDATE friend_requests SET status = 'accepted' WHERE from_id = %s AND to_id = %s AND status = 'pending'",
                (from_id, user_id)
            )
        db.commit()
    add_notification(from_id, 'friend_accepted', f'{accepter_name} accepted your friend request')


def decline_request(user_id, from_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "DELETE FROM friend_requests WHERE from_id = %s AND to_id = %s AND status = 'pending'",
                (from_id, user_id)
            )
        db.commit()


def unfriend(user_id, other_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "DELETE FROM friend_requests WHERE "
                "(from_id = %s AND to_id = %s) OR (from_id = %s AND to_id = %s)",
                (user_id, other_id, other_id, user_id)
            )
        db.commit()


def _rows_to_users(rows):
    return [{'id': r[0], 'username': r[1]} for r in rows]


def get_friends(user_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "SELECT a.id, a.name FROM accounts a "
                "JOIN friend_requests fr ON "
                "  (fr.from_id = %s AND fr.to_id = a.id) OR "
                "  (fr.to_id = %s AND fr.from_id = a.id) "
                "WHERE fr.status = 'accepted'",
                (user_id, user_id)
            )
            rows = cursor.fetchall()
    return _rows_to_users(rows)


def get_received_requests(user_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "SELECT a.id, a.name FROM accounts a "
                "JOIN friend_requests fr ON fr.from_id = a.id "
                "WHERE fr.to_id = %s AND fr.status = 'pending'",
                (user_id,)
            )
            rows = cursor.fetchall()
    return _rows_to_users(rows)


def get_sent_requests(user_id):
    with connect_db() as db:
        with db.cursor() as cursor:
            cursor.execute(
                "SELECT a.id, a.name FROM accounts a "
                "JOIN friend_requests fr ON fr.to_id = a.id "
                "WHERE fr.from_id = %s AND fr.status = 'pending'",
                (user_id,)
            )
            rows = cursor.fetchall()
    return _rows_to_users(rows)
