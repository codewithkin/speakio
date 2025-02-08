import React, { useState, useEffect } from 'react'

export const AuthContext = React.createContext<{
  name: string | null
  password: string | null
  recordings: Array<any>
  login: (name: string, password: string) => void
  logout: () => void
} | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string | null>(
    sessionStorage.getItem('name') || null
  )
  const [password, setPassword] = useState<string | null>(
    sessionStorage.getItem('password') || null
  )
  const [recordings, setRecordings] = useState<Array<any>>(
    JSON.parse(sessionStorage.getItem('recordings') || '[]')
  )

  useEffect(() => {
    sessionStorage.setItem('name', name || '')
    sessionStorage.setItem('password', password || '')
    sessionStorage.setItem('recordings', JSON.stringify(recordings))
  }, [name, password, recordings])

  const login = (name: string, password: string) => {
    setName(name)
    setPassword(password)
  }

  const logout = () => {
    setName(null)
    setPassword(null)
    setRecordings([])
  }

  return (
    <AuthContext.Provider value={{ name, password, recordings, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

