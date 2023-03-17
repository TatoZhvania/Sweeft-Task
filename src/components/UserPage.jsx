import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import User from './User';
import FriendList from './FriendList';
import './UserPage.css';

const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoadingUser(true);
                const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`);
                const data = await response.json();
                setUser(data);
                setLoadingUser(false);
            } catch (error) {
                console.error(error);
                setLoadingUser(false);
            }
        };
        fetchUser();
    }, [userId]);



    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

        if (bottom && !loadingFriends) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingFriends]);

    return (
        <div className="user-page">
            {loadingUser ? (
                <p>Loading user data...</p>
            ) : (
                <div className="user-info">
                    <User user={user} />
                    <div className='profile'>
                        <ul>
                            <li className='profile-name' >{user.name} {user.lastName}</li>
                            <li>{user.title}</li>
                            <br />
                            <li><span>Email:</span> {user.email}</li>
                            <li><span>Ip Address:</span> {user.ip}</li>
                            <li><span>Jon Area: </span>{user.jobArea}</li>
                            <li><span>Jon Type:</span> {user.jobType}</li>
                        </ul>
                    </div>

                    <div className='profile-address'>
                        <ul>
                            <p>Address:</p>
                            <li><span>City:</span>{user.address.city}</li>
                            <li><span>County:</span>{user.address.country}</li>
                            <li><span>State:</span>{user.address.state}</li>
                            <li><span>Street Address:</span>{user.address.streetAddress}</li>
                            <li><span>Zip Code:</span>{user.address.zipCode}</li>
                        </ul>
                    </div>

                </div>
            )}

            {loadingFriends ? (
                <p>Loading friends list...</p>
            ) : (
                <FriendList />
            )}

            {loadingFriends && <p className="loading">Loading more friends...</p>}
        </div>
    );
};

export default UserPage;

