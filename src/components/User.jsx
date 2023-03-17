import React from 'react';
import './User.css'

const User = ({ user, key }) => {
    return (
        <div key={key} className='user'>
            <img className='user-img' src={user.imageUrl} alt={`${user.title}`} />
            <p>
                {user.prefix} {user.name} {user.lastName}
            </p>
            <p>{user.title}</p>
        </div>
    );
};

export default User;
