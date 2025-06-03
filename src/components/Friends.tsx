import React, { useEffect, useState } from 'react';
import { useUser, type User } from '../context/UserContext';

interface FriendsProps {
}

const Friends: React.FC<FriendsProps> = ({  }) => {
  const { user, delFriend } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [friendToRemove, setFriendToRemove] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    if (user?.friends) {
      setFriends(user?.friends);
      console.log('in friends: ', friends)
    }
  }, [user?.friends])

  const confirmRemoveFriend = (friend: User) => {
    setFriendToRemove(friend);
    setShowModal(true);
  };

  const cancelRemoveFriend = () => {
    setFriendToRemove(null);
    setShowModal(false);
  };

  const removeFriend = (friendId: number) => {
    setFriends(friends.filter(f => f.id !== friendId));
    setFriendToRemove(null);
    setShowModal(false);
    delFriend(friendId);
  };

  return (
    <div className="friends-list">
      <h3>Friends</h3>
      {friends.length > 0 ? (
        friends.map(friend => (
          <div key={friend.id} className="friend-item">
            <span>{friend.name}</span>
            <div className="friend-actions">
              <button 
                className="friend-remove" 
                onClick={() => removeFriend(friend.id)}
              >
                Delete from friends
              </button>
              <button className="friend-invite">Invite to board</button>
            </div>
          </div>
        ))
      ) : (
        <p>You have no friends</p>
      )}
        {showModal && friendToRemove && (
        <div className="modal-overlay">
            <div className="modal-content">
            <div className="modal-message">Are you shure you want to kick {friendToRemove.name} from friends?</div>
            <div className="modal-buttons">
                <a href="#" onClick={(e) => { e.preventDefault(); cancelRemoveFriend(); }} className="modal-button modal-button-cancel">
                Cancel
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); removeFriend(friendToRemove.id); }} className="modal-button modal-button-confirm">
                Delete
                </a>
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default Friends;