import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../dogs.css';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  image: string; 
}

const DogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dog, setDog] = useState<Dog | null>(null);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const res = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDog(res.data);
      } catch (error) {
        console.error('Error fetching dog:', error);
        alert('Failed to fetch dog');
      }
    };

    if (id) {
      fetchDog();
    }
  }, [id]);

  if (!dog) {
    return <div>Loading...</div>;
  }


  const handleGenerateImage = async () => {
    
  }
  

  return (
    <div className="form" style={{ marginTop: '100px' }}>
        <h1>{dog.name}</h1>
        <img src={dog.image} alt={dog.name} />
        <h6>Age: {dog.age}</h6>
        <h6>Breed: {dog.breed}</h6>
        <h6>Color: {dog.color}</h6>
        <Link to="/dogs"><button className="back">Back</button></Link>
      </div>
  );
};

export default DogPage;
