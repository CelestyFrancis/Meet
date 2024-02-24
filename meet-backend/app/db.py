# app/db.py
import psycopg2
from flask import current_app
from contextlib import closing


def connect_db():
    return psycopg2.connect(current_app.config['DATABASE_URI'])


def init_db():
    with current_app.app_context():
        with closing(connect_db()) as db:
            with db.cursor() as cursor:
                with current_app.open_resource('schema.sql', mode='r') as f:
                    cursor.execute(f.read())
            db.commit()
