import React, { useEffect, useState } from "react";
import LabelAndInput from "./LabelAndInput";


const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };


    const handleSignUp = async () => {
        try{
        const response = await fetch('https://dogs.kobernyk.com/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                firstName,
                lastName,
            }),
        })
        if (!response.ok){
            throw new Error('Wrong data');
        }
        const data:any = await response.json();
        if (data && data.token){
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_name", username);
            alert('Registration Successfully')
        } else{
            alert(data.message)
        }
        } catch (err: any) {
            alert(err.message || 'Something went');
        }
    }
    

    return(
        <div className="form" style={{marginTop: "100px"}}>
            <h1>Sign Up</h1>
        <LabelAndInput
        id="user_name"
        labelText="Username"
        inputType="text"
        value={username}
        onChange={handleUsernameChange}
        />
        <LabelAndInput
        id="password"
        labelText="Password"
        inputType="password"
        value={password}
        onChange={handlePasswordChange}
        />
        <LabelAndInput
        id="first_name"
        labelText="First name"
        inputType="text"
        value={firstName}
        onChange={handleFirstNameChange}
        />
        <LabelAndInput
        id="lastn_name"
        labelText="Last name"
        inputType="text"
        value={lastName}
        onChange={handleLastNameChange}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

export default SignUpForm;