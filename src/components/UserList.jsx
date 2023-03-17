import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import User from './User';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadUsers = async () => {
        setLoading(true);
        const response = await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/10`);
        const data = await response.json();
        console.log(data)

        if (data && data.list) {
            setUsers([...users, ...data.list]);
        }
        setLoading(false);
    };


    useEffect(() => {
        loadUsers();
    }, [page]);

    const handleScroll = () => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

        if (bottom && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div className="user-list">
            {users.map((user) => (
                <Link key={user.id} to={`/users/${user.id}`}>
                    <User user={user} />
                </Link>
            ))}
            {loading && <p className="loading">Loading...</p>}
        </div>
    );
};

export default UserList;
