import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../dogs.css';

const EditDog = () => {
  const [dog, setDog] = useState({
    name: '',
    age: '',
    breed: '',
    color: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const response = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDog(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dog data:', err);
        setError('Не вдалося завантажити дані про собаку');
        setLoading(false);
      }
    };

    if (id) {
      fetchDogData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedDog = { ...dog };
      await axios.put(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, updatedDog, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert('Dog updated successfully');
      navigate(`/dogs`);
    } catch (error) {
      console.error('Error updating dog:', error);
      alert('Something went wrong');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
         <div className='form' style={{marginTop: '100px'}}>
      <h1>Edit the {dog.name}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Name'
            value={dog.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            id="age"
            name="age"
            placeholder='Age'
            value={dog.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="breed"
            name="breed"
            placeholder='Breed'
            value={dog.breed}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="color"
            name="color"
            placeholder='Color'
            value={dog.color}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save change</button>
      </form>
      <Link to={`/dogs`}><button className='back'>Back</button></Link>
    </div>
  );
};

export default EditDog;
