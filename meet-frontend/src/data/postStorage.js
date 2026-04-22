import users from './users'
import notificationStorage from './notificationStorage'

const STORAGE_KEY = 'meet_posts'

const getPosts = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const savePosts = posts => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

const createPost = ({ title, content, authorId, authorName }) => {
  const posts = getPosts()
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    authorId,
    authorName,
    createdAt: new Date().toISOString(),
  }
  posts.unshift(newPost)
  savePosts(posts)

  users
    .filter(u => u.id !== authorId)
    .forEach(u =>
      notificationStorage.addNotification(
        u.id,
        'new_post',
        `${authorName} posted: "${title}"`
      )
    )

  return newPost
}

const updatePost = (id, { title, content }) => {
  const posts = getPosts()
  const idx = posts.findIndex(p => p.id === id)
  if (idx === -1) throw new Error('Post not found')
  posts[idx] = { ...posts[idx], title, content }
  savePosts(posts)
  return posts[idx]
}

const removePost = id => {
  savePosts(getPosts().filter(p => p.id !== id))
}

const getUserPosts = authorId => getPosts().filter(p => p.authorId === authorId)

const postStorage = { getPosts, createPost, updatePost, removePost, getUserPosts }

export default postStorage
