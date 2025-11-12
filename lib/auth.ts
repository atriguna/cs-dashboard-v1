// Simple authentication for demo purposes
// In production, use Supabase Auth or other proper auth service

const DEMO_USERS = [
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
  { email: 'demo@example.com', password: 'demo123456', name: 'Demo User' },
  { email: 'user@example.com', password: 'password123', name: 'Test User' },
];

export interface User {
  email: string;
  name: string;
}

export async function login(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = DEMO_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { user: null, error: 'Invalid email or password' };
  }

  const session = {
    user: { email: user.email, name: user.name },
    timestamp: Date.now(),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_session', JSON.stringify(session));
  }
  
  return { user: { email: user.email, name: user.name }, error: null };
}

export async function checkAuth(): Promise<User | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const session = localStorage.getItem('auth_session');
  
  if (!session) {
    return null;
  }

  try {
    const sessionData = JSON.parse(session);
    
    // Check if session is still valid (24 hours)
    const sessionAge = Date.now() - sessionData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (sessionAge > maxAge) {
      localStorage.removeItem('auth_session');
      return null;
    }
    
    return sessionData.user;
  } catch (error) {
    localStorage.removeItem('auth_session');
    return null;
  }
}

export async function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_session');
    window.location.href = '/login';
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const session = localStorage.getItem('auth_session');
  
  if (!session) {
    return null;
  }

  try {
    const sessionData = JSON.parse(session);
    return sessionData.user;
  } catch (error) {
    return null;
  }
}
