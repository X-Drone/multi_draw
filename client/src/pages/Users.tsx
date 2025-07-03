import React, { useState, useEffect } from 'react';
import { useUser, User } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Users: React.FC = () => {
  const { user, addFriend } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    if (user?.friends){
      setFriends(user?.friends);
      console.log(friends);
    }
  }, [user?.friends])

  // Пример данных пользователей
  useEffect(() => {
    const mockUsers: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', friends: [] },
      { id: 2, name: 'Bob', email: 'bob@example.com', friends: [] },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', friends: [] },
      { id: 4, name: 'David', email: 'david@example.com', friends: [] },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = users.filter(u => u.name.toLowerCase().includes(term.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const addFriendHandler = (friend: User) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!user.friends?.some(f => f.id === friend.id)) {
      setFriends([...friends, friend]);
      addFriend(friend);
      //console.log(friends);
      console.log(user);
      console.log('==================');
    }
  };

  return (
    <div className="users-page">
      <div className="users-search">
        <input
          type="text"
          placeholder="Users search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="users-search-input"
        />
      </div>
      <div className="users-main">
        <div className="users-list">
          {filteredUsers.map(u => (
            <div key={u.id} className="user-item">
              <span>{u.name}</span>
              {user?.friends?.some(f => f.id === u.id) ? (
                <span className="user-already-friend">Already in friends</span>
              ) : (
                <a href="#" onClick={(e) => { e.preventDefault(); addFriendHandler(u); }} className="user-add">
                  Add to friends
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;