import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LabelAndInput from "./LabelAndInput";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };


    const handleLogin = async () => {
        try{
        const response = await fetch('https://dogs.kobernyk.com/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        if (!response.ok){
            throw new Error('Wrong username or password');
        }
        const data:any = await response.json();
        if (data && data.token){
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_name", username);
            alert('Login Successfully')
            navigate('/dogs');
            window.location.reload();
        } else{
            alert(data.message)
        }
        } catch (err: any) {
            alert(err.message || 'Something went');
        }
    }
    

    return(
        <div className="form" style={{marginTop: '100px'}}>
            <h1>Login</h1>
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
        <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginForm;