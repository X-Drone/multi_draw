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
  delFriend: (friendId: number) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  addFriend: (friend: User) => {},
  delFriend: (friendId: number) => {}
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
    friends.push(friend);
    user?.friends.push(friend);
    console.log('----\nfriends updated', friends, friend, updatedFriends, '\n----');
  }

  const delFriend = (friendId: number) => {
    let updatedFriends = [...friends];
    updatedFriends.splice(friendId, 1);
    setFriends(updatedFriends);
    friends.splice(friendId, 1);
    user?.friends.splice(friendId, 1);
    console.log('----\nfriends updated', friends, updatedFriends, '\n----');
  }

  return (
    <UserContext.Provider value={{ user, login, logout, addFriend, delFriend }}>
      {children}
    </UserContext.Provider>
  );
};