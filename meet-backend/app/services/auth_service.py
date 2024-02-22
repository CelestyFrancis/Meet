mock_users = [
    {'username': "celesty", 'password': "12345"},
]

def login_user(username, password):
    user = next((user for user in mock_users if user['username'] == username and user['password'] == password), None)
    return user
