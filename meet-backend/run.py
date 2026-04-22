from app import app
from app import db
from app.services.auth_service import seed_users

if __name__ == "__main__":
    with app.app_context():
        db.init_db()
        seed_users()
    app.run(debug=True)
