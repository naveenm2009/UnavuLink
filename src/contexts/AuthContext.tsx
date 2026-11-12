import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS } from '../integrations/supabase/mockData';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isVolunteerApproved: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  signup: (userData: Partial<UserProfile>) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (roleKey: 'admin' | 'donor' | 'acceptor' | 'ngo' | 'common_people' | 'volunteer') => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('unavulink_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default to Donor for immediate demo experience, or Admin
    return DEMO_USERS['admin'];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('unavulink_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('unavulink_user');
    }
  }, [user]);

  const role = user?.role || 'common_people';
  const isAuthenticated = Boolean(user);
  const isVolunteerApproved = Boolean(user?.is_volunteer && user?.volunteer_status === 'approved');

  const login = async (email: string, targetRole?: UserRole): Promise<boolean> => {
    // Check demo users matching email or role
    const found = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || (targetRole && u.role === targetRole)
    );

    if (found) {
      setUser(found);
      return true;
    }

    // Generic fallback login
    const newUser: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      full_name: email.split('@')[0],
      email: email,
      role: targetRole || 'common_people',
      is_volunteer: false,
      volunteer_status: 'none',
      verification_status: 'verified',
      account_status: 'active',
      location: 'Coimbatore, Tamil Nadu',
      latitude: 11.0168,
      longitude: 76.9558,
    };
    setUser(newUser);
    return true;
  };

  const signup = async (userData: Partial<UserProfile>): Promise<boolean> => {
    const newUser: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      full_name: userData.full_name || 'New Community User',
      email: userData.email || 'user@unavulink.org',
      phone: userData.phone || '+91 98765 43210',
      role: userData.role || 'common_people',
      is_volunteer: userData.is_volunteer || false,
      volunteer_status: userData.is_volunteer ? 'pending' : 'none',
      verification_status: userData.role === 'admin' ? 'pending' : (userData.role === 'common_people' ? 'verified' : 'pending'),
      account_status: 'active',
      location: userData.location || 'Coimbatore, Tamil Nadu',
      latitude: userData.latitude || 11.0168,
      longitude: userData.longitude || 76.9558,
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoRole = (roleKey: 'admin' | 'donor' | 'acceptor' | 'ngo' | 'common_people' | 'volunteer') => {
    const demoUser = DEMO_USERS[roleKey];
    if (demoUser) {
      setUser(demoUser);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isVolunteerApproved,
        login,
        signup,
        logout,
        switchDemoRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
