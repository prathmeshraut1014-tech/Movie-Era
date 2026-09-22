import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('movieera_token')
    const saved = localStorage.getItem('movieera_user')
    if (token && saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('movieera_token')
        localStorage.removeItem('movieera_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token, email: userEmail, name } = res.data
    localStorage.setItem('movieera_token', token)
    localStorage.setItem('movieera_user', JSON.stringify({ email: userEmail, name }))
    setUser({ email: userEmail, name })
    return res.data
  }

  const register = async (email, password, name) => {
    const res = await api.post('/auth/register', { email, password, name })
    const { token, email: userEmail, name: userName } = res.data
    localStorage.setItem('movieera_token', token)
    localStorage.setItem('movieera_user', JSON.stringify({ email: userEmail, name: userName }))
    setUser({ email: userEmail, name: userName })
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('movieera_token')
    localStorage.removeItem('movieera_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
