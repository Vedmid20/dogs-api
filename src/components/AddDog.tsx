import React from "react";
import '../dogs.css';
import { Link } from "react-router-dom";
import axios from "axios";

const AddDog = () => {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [breed, setBreed] = React.useState('');
    const [color, setColor] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Array.from(document.getElementsByTagName('form')[0].getElementsByTagName('input'))
        .reduce((acc, el) => {
            acc[el.name] = el.value; return acc
        }, {} as Record<string, string | number>);
        console.log(data);
        
        const dogImageResult = await axios.get("https://dog.ceo/api/breeds/image/random");
        data.image = dogImageResult.data.message;

        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "https://dogs.kobernyk.com/api/v1/dogs", 
                data, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            alert("Dog added successfully");
        } catch (error) {
            console.error("Error adding dog:", error);
            alert("Something went wrong");
        }
    };

    return (
        <main>
            <div className="form">
                <h1 style={{textAlign: 'center'}}>Add Dog</h1>
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
                    <button type="submit">Add Dog</button>
                    <Link to='/dogs'><button className="back">Back</button></Link>
                </form>
            </div>
        </main>
    );
}

export default AddDog;
