import React from 'react';
import PropTypes from 'prop-types';

const UserDetails = ({ user, repositories, onReset }) => {
  return (
    <div>
      <div className="slika-naslov">
      <img src={user.avatar_url} alt="User Avatar" className='slika' />
      <h2>{user.name}</h2>
      </div>
      <p>Location: {user.location}</p>
      <p>Bio: {user.bio}</p>
      <h3>Repositories:</h3>
      <ul className='repo-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <button onClick={onReset}>Reset</button>
    </div>
  );
 };

UserDetails.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  onReset: PropTypes.func.isRequired,
};

export default UserDetails;