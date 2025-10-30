import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import type { User } from '../../types'

interface LoginPageProps {
  onLogin: (user: User) => void
  onNavigateToManager: () => void
}

export function LoginPage({ onLogin, onNavigateToManager }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  // Normalize backend role "user" -> frontend role "customer"
  const normalizeRole = (u: any): User => {
    const role = u?.role === 'user' ? 'customer' : u?.role
    return { ...u, role } as User
  }

  // Save token + user so dashboard can read them
  const persistAuth = (rawUser: any, maybeToken?: string) => {
    const user = normalizeRole(rawUser)
    const token = maybeToken || ''
    localStorage.setItem('current_user', JSON.stringify(user))
    if (token) {
      localStorage.setItem('auth_token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    onLogin(user)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      alert('Please fill all required fields')
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
        })
        // Support different backend shapes: { user, token } or whole user
        const rawUser = res.data?.user ?? res.data?.data?.user ?? res.data?.userData ?? res.data
        const token =
          res.data?.token || res.data?.accessToken || res.data?.data?.token || res.data?.jwt || ''
        persistAuth(rawUser, token)
      } else {
        // REGISTER
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match')
          setLoading(false)
          return
        }
        const res = await axios.post(`${API_URL}/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        alert('Account created successfully!')
        const rawUser = res.data?.user ?? res.data?.data?.user ?? res.data?.userData ?? res.data
        const token =
          res.data?.token || res.data?.accessToken || res.data?.data?.token || res.data?.jwt || ''
        persistAuth(rawUser, token)
      }
    } catch (err: any) {
      console.error('Auth error:', err)
      alert(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? 'Welcome Back' : 'Create Customer Account'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isLogin
                ? 'Sign in to your customer account to continue shopping'
                : 'Join Pabasara Products to start ordering'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required={!isLogin}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <Button variant="outline" className="w-full" onClick={onNavigateToManager}>
                As a Manager
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
