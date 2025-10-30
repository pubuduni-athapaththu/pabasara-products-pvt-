import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import type { User } from '../../types';
import React from 'react'

interface ManagerLoginPageProps {
  onLogin: (user: User) => void;
  onGoBack: () => void;
  onNavigateToManagerRegister: () => void;
}

export function ManagerLoginPage({ onLogin, onGoBack, onNavigateToManagerRegister }: ManagerLoginPageProps) {
  const [formData, setFormData] = useState({
    managerId: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manager authentication - in real app, this would call an API
    // For demo purposes, we'll validate that the manager ID follows the correct format
    if (!formData.managerId.startsWith('pabasara')) {
      alert('Invalid Manager ID. Manager ID must start with "pabasara"');
      return;
    }
    
    // Mock successful login
    onLogin({
      id: `manager-${Date.now()}`,
      email: formData.email,
      name: `Manager ${formData.managerId}`,
      role: 'manager',
      managerId: formData.managerId
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onGoBack}
                className="absolute left-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
            <CardTitle className="text-2xl">Manager Login</CardTitle>
            <p className="text-muted-foreground">
              Sign in with your manager credentials to access the admin panel
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
                  onChange={(e) => setFormData({...formData, managerId: e.target.value})}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your unique manager identifier
                </p>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Sign In as Manager
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={onNavigateToManagerRegister}
                className="text-sm text-primary hover:underline"
              >
                Don't have a manager account? Register here
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}