import React, { useEffect } from "react";
import '../dogs.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";



function withParams<T>(Component: T): any {
    return props => <Component {...props} params={useParams()} />;
  }

class DogPage extends React.Component {
state = {
    dog: null as Dog | null
}}

const UpdateDog = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [breed, setBreed] = React.useState('');
    const [color, setColor] = React.useState('');

    useEffect(() => {
        const fetchDogData = async () => {
            const response = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`);
            const dogData = response.data;
            setName(dogData.name);
            setAge(dogData.age);
            setBreed(dogData.breed);
            setColor(dogData.color);
        };
        fetchDogData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            name,
            age,
            breed,
            color,
        };
        
        console.log(data.age);
        const dogImageResult = await axios.get("https://dog.ceo/api/breeds/image/random");
        data.image = dogImageResult.data.message;

        await axios.patch(`https://dogs.kobernyk.com/api/v1/dogs/${this.props.params.dogId}`, data);
    };

    return(
         <main>
            <Link to='/'>Back</Link>
            <div className="add-form">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <input 
                        type="number"
                        name="age"
                        placeholder="Age" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                    />
                    <input 
                        type="text"
                        name="breed"
                        placeholder="Breed" 
                        value={breed} 
                        onChange={(e) => setBreed(e.target.value)} 
                    />
                    <input 
                        type="text"
                        name="color"
                        placeholder="Color" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)} 
                    />
                    <button type="submit">Update Dog</button>
                </form>
            </div>
         </main>
    );
};

export default withParams(UpdateDog);
