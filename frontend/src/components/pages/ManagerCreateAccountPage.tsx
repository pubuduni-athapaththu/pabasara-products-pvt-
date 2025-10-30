import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ArrowLeft } from 'lucide-react'
import type { User } from '../../types'

interface ManagerCreateAccountPageProps {
  onLogin: (user: User) => void
  onGoBack: () => void
}

export function ManagerCreateAccountPage({ onLogin, onGoBack }: ManagerCreateAccountPageProps) {
  const [formData, setFormData] = useState({
    managerId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate manager ID
    if (!formData.managerId.startsWith('pabasara')) {
      alert('Invalid Manager ID. Manager ID must start with "pabasara" (e.g., pabasara1234)')
      return
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // In real app: send to backend API here
    // For now: mock success
    onLogin({
      id: `manager-${Date.now()}`,
      email: formData.email,
      name: formData.name,
      role: 'manager',
      managerId: formData.managerId,
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Button variant="ghost" size="sm" onClick={onGoBack} className="absolute left-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            <CardTitle className="text-2xl">Create Manager Account</CardTitle>
            <p className="text-muted-foreground">
              Register a new manager account with your authorized Manager ID
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="managerId">Manager ID</Label>
                <Input
                  id="managerId"
                  placeholder="e.g., pabasara1234"
                  value={formData.managerId}
                  onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

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
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Create Manager Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Only authorized personnel with valid Manager IDs can create manager accounts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
