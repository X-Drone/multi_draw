import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  friends: User[];
}

interface UserContextType {
  user: User | null;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  addFriend: (friend: User) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  addFriend: (friend: User) => {}
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userIdCounter, setUserIdCounter] = useState<number>(1); // Счётчик для генерации id
  const [friends, setFriends] = useState<User[]>([]);

  const login = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    } else {
      const newUser: User = { id: userIdCounter, ...userData } as User; // Генерация id
      setUser(newUser);
      setUserIdCounter(prevId => prevId + 1); // Увеличение счётчика
    }
  };

  const logout = () => {
    setUser(null);
  };

  const addFriend = (friend: User) => {
    let updatedFriends = [...friends];
    updatedFriends.push(friend);
    setFriends(updatedFriends);
    console.log('friends updated');
    console.log(friends);
  }

  return (
    <UserContext.Provider value={{ user, login, logout, addFriend }}>
      {children}
    </UserContext.Provider>
  );
};