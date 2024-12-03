import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../dogs.css';

const DeleteDog = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [dog, setDog] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const fetchDogData = async () => {
            try {
                const response = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setDog(response.data);
            } catch (err) {
                console.error('Error fetching dog data:', err);
            }
        };

        if (id) {
            fetchDogData();
        }
    }, [id]);

    const handleSubmit = async () => {
        try {
            await axios.delete(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            navigate('/dogs');
        } catch (error) {
            console.error('Error deleting dog:', error);
            alert('Something went wrong');
        }
    };

    return (
        <main>
        <div className="form">
            <h1>Do you really want to delete {dog?.name}?</h1>
            <button onClick={handleSubmit}>Yes</button>
            <Link to="/dogs"><button className='cancel'>No</button></Link>
        </div>
        </main>
    );
};

export default DeleteDog;
