import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLoginPage = nextUrl.pathname === '/login';

      if (isOnLoginPage && isLoggedIn) {
        // Redirect logged-in users trying to access the login page to the dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      if (isOnDashboard && !isLoggedIn) {
        // Redirect unauthenticated users to login page when trying to access the dashboard
        return false;
      }

      if (isOnDashboard && isLoggedIn) {
        // Allow authenticated users to access the dashboard
        return true;
      }
      // For all other pages, allow access without redirection
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
