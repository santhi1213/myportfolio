// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//   id: string;
//   email: string;
//   name: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   isAuthenticated: boolean;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in on app start
//     const savedUser = localStorage.getItem('portfolio_admin_user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string): Promise<boolean> => {
//     // Demo credentials - in production, this would be an API call
//     if (email === 'admin@portfolio.com' && password === 'admin123') {
//       const userData = {
//         id: '1',
//         email: 'admin@portfolio.com',
//         name: 'Portfolio Admin'
//       };
//       setUser(userData);
//       localStorage.setItem('portfolio_admin_user', JSON.stringify(userData));
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('portfolio_admin_user');
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     isAuthenticated: !!user,
//     isLoading
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = sessionStorage.getItem('portfolio_admin_token');
    const savedUser = sessionStorage.getItem('portfolio_admin_user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5065/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password
        }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      
      // Store the JWT token
      if (data.token) {
        sessionStorage.setItem('portfolio_admin_token', data.token);
        
        // Create user object (you can decode JWT to get more info if needed)
        const userData = {
          id: '1',
          email: email,
          name: 'Portfolio Admin'
        };
        
        setUser(userData);
        sessionStorage.setItem('portfolio_admin_user', JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('portfolio_admin_token');
    sessionStorage.removeItem('portfolio_admin_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};