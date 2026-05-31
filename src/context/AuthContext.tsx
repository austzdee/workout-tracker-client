import { createContext, useContext, useState } from 'react'

type AuthContextType = {
  token: string | null
  fullName: string | null
  login: (token: string, fullName: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const [fullName, setFullName] = useState<string | null>(
    localStorage.getItem('fullName')
  )

  function login(token: string, fullName: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('fullName', fullName)

    setToken(token)
    setFullName(fullName)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('fullName')

    setToken(null)
    setFullName(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        fullName,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}