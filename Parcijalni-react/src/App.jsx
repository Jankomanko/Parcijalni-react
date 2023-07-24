import React, { useState } from 'react';
import './App.css';
import UserForm from './Components/UserForm';
import UserDetails from './Components/UserDetails';

function App() {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const getUserDetails = (username) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);

        fetch(data.repos_url)
          .then((response) => response.json())
          .then((data) => setRepositories(data))
          .catch((error) => {
            console.error('Error fetching repositories:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setUser(null);
        setRepositories([]);
      });
  };

  const handleReset = () => {
    setUser(null);
    setRepositories([]);
  };

  return (
    <div className="App">
      <h1>GitHub User</h1>
      {user ? (
        <UserDetails user={user} repositories={repositories} onReset={handleReset} />
      ) : (
        <UserForm onSubmit={getUserDetails} />
      )}
    </div>
  );
}

export default App;