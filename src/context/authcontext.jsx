import React, { createContext, useContext, useState, useEffect } from 'react';
import { users as mockUsers } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecommerce_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('ecommerce_users_list');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ecommerce_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ecommerce_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ecommerce_users_list', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return { success: true, user: foundUser };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const register = ({ name, email, phone, password }) => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return { success: false, message: 'Email already registered.' };
    }
    const newUser = { id: Date.now(), name, email, phone, role: 'customer' };
    setUsers([...users, newUser]);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  return (
    <AuthContext.Provider value={{ user, usersCount: users.length, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}