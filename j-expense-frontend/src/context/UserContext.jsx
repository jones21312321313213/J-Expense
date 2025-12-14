import React, { createContext, useContext, useEffect, useState } from 'react';
import UserService from '../Components/Services/UserService';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('jexpense_user');
    if (stored) {
      try { setCurrentUser(JSON.parse(stored)); } catch (e) {}
    }
  }, []);

  // set user both in state and localStorage
  const setUser = (user) => {
    setCurrentUser(user);
    if (user) localStorage.setItem('jexpense_user', JSON.stringify(user));
    else localStorage.removeItem('jexpense_user');
  };

  // simple login by username/password (dev) - returns user object and stores it
  const login = async (username, password) => {
    // fetch all users and find match - this is NOT secure, placeholder for dev use
    const users = await UserService.getAllUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    setUser(user);
    return user;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ currentUser, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

<<<<<<< HEAD
export default UserContext;
=======
export default UserContext;
>>>>>>> f0c7b21fe9de39716c4d55a1949f41df63e9f8a6
