import users from '../data/users'

const loginUser = async ({ email, password }) => {
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) throw new Error('Invalid email or password')
  return { username: user.username, id: user.id, token: `user-${user.id}` }
}

const authService = { loginUser }

export default authService
