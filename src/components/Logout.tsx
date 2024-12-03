import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../dogs.css';


const Logout = () => {
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user_name");
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Something went wrong');
        }
    }

    return (
        <div className='form' style={{marginTop: '100px'}}>
            <h1>Do you really want to logout?</h1>
            <button onClick={handleSubmit} className='cancel'>Yes</button>
            <Link to={"/dogs"}><button className='back'>No</button></Link>
        </div>
    )
}


export default Logout;