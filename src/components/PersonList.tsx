import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDogs, setLoading, setError } from '../store/dogsSlice';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
}

const DogList = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dogs, loading, error } = useSelector((state: any) => state.dogs);

  const getDogs = () => {
    if (!token) {
      return;
    }
    dispatch(setLoading(true));
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      dispatch(setDogs(response.data));
      console.log(response.data);
    }).catch(error => {

      navigate('/login');
    }).finally(() => {
      dispatch(setLoading(false));
    });
  }

  useEffect(() => {
    getDogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
   if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="form" style={{ marginTop: '10px' }}>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {dogs.map((dog: any) => (
          <div key={dog._id}>
            <Link to={`/${dog._id}`}>
              <li style={{ marginBottom: '-2px', marginTop: '15px' }}>Dog: {dog.name}</li>
            </Link>
            <hr />
            <Link to={`/${dog._id}/edit`} style={{ marginLeft: '10px' }}>
              <li style={{ marginBottom: '-10px' }}>{dog.name}: Edit</li>
            </Link>
            <Link to={`/${dog._id}/delete`} style={{ marginLeft: '10px' }}>
              <li>{dog.name}: Delete</li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DogList;
