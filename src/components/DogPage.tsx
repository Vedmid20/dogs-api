import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, setDog, setDogs } from '../store/dogsSlice';
import { RootState } from '../store/store';
import axios from 'axios';
import '../dogs.css';
import useLocalStorage from '../effects/useLocalStorage';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  image: string;
};

const fetchDog = async (id: string, dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(setDog(response.data));
  } catch (error) {
    dispatch(setError("Error fetching dog"));
  } finally {
    dispatch(setLoading(false));
  }
};


const DogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dog = useSelector((state: RootState) => state.dogs.dogs.find((dog) => dog._id === id));
  const { loading, error } = useSelector((state: RootState) => state.dogs);

  useEffect(() => {
    if (!dog && id) {
      fetchDog(id, dispatch);
    }
  }, [id, dog, dispatch]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dog) return <div>Dog not found</div>;

  return (
    <div className="form" style={{ marginTop: '100px' }}>
      <h1>{dog.name}</h1>
      <img src={dog.image} alt={dog.name} />
      <h6>Age: {dog.age}</h6>
      <h6>Breed: {dog.breed}</h6>
      <h6>Color: {dog.color}</h6>
      <Link to="/dogs">
        <button className="back">Back</button>
      </Link>
    </div>
  );
};

export default DogPage;
