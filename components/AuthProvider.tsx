'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkAuth } from '@/lib/auth';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyAuth() {
      // Skip auth check for login page
      if (pathname === '/login') {
        setLoading(false);
        return;
      }

      const user = await checkAuth();
      
      if (!user) {
        router.push('/login');
      } else {
        setAuthenticated(true);
      }
      
      setLoading(false);
    }

    verifyAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page without auth check
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Show protected content only if authenticated
  if (authenticated) {
    return <>{children}</>;
  }

  return null;
}
