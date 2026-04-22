# Meet

A social platform where users can post their thoughts, read what others are sharing, and manage their own posts.

**Live demo:** [cf-meet.netlify.app](https://cf-meet.netlify.app)

## What it does

- **Login** with one of four prebuilt demo accounts — no registration needed
- **Post** a title and message to the shared timeline
- **Edit or delete** your own posts inline
- **See everyone's posts** on the Dashboard
- **View only your posts** on the Profile page
- **Friends** — send and receive friend requests, accept or decline them, and unfriend people; friend data persists across user sessions via localStorage
- **Notifications** — bell icon in the header with unread badge; notified when someone sends you a friend request, accepts your request, or posts on the timeline; click any notification to mark it read, mark all read at once, or clear all

## Demo accounts

| Name  | Email             | Password  |
|-------|-------------------|-----------|
| Alice | alice@meet.com    | alice123  |
| Bob   | bob@meet.com      | bob123    |
| Carol | carol@meet.com    | carol123  |
| David | david@meet.com    | david123  |

## Tech stack

### Frontend (`meet-frontend/`)
- **React 18** with React Router for navigation
- **Redux Toolkit** for auth, post, and friend state
- **localStorage** for persisting posts, friend relationships, and notifications between sessions (no backend required to run)

### Backend (`meet-backend/`) — optional
A Flask + PostgreSQL backend that mirrors all frontend functionality. Run it if you want posts stored in a real database instead of localStorage.

- `POST /auth/login` — authenticate with prebuilt credentials, returns JWT
- `GET  /post/get` — fetch all posts
- `GET  /post/get_my_post` — fetch current user's posts
- `POST /post/create` — create a new post
- `PUT  /post/edit/<id>` — edit your own post
- `DELETE /post/delete/<id>` — delete your own post

## Running the app

### Frontend only (no backend needed)
```bash
cd meet-frontend
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) and log in with any demo account.

### With backend (PostgreSQL required)
```bash
cd meet-backend
pip install -r requirements.txt
python run.py
```
The backend seeds the four demo users on startup and runs on `http://localhost:5000`.
