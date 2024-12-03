import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DogPage from './components/DogPage';
import PersonList from './components/PersonList';
import LoginForm from './components/LoginForm';
import AddDog from './components/AddDog';
import SignUpForm from './components/SignUpForm';
import TodoList from './components/todo/TodoList';
import EditDog from './components/EditDog';
import DeleteDog from './components/DeleteDog';
import Logout from './components/Logout';
import './App.css';


const App = () => {
  const token = localStorage.getItem("token")

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <Link to="/"><li>Login</li></Link>
            <Link to="/signup"><li>Sign Up</li></Link>
            {token ? <Link to="/dogs"><li>Dogs</li></Link> : <Link to="/"><li>Dogs</li></Link>}
            {token ? <Link to="/add-dog"><li>Add Dog</li></Link> : <Link to="/"><li>Add Dog</li></Link>}
            <Link to="/todo"><li>Todo</li></Link>
            {token ? <Link to="/logout"><li>Logout</li></Link> : <Link to="/"><li>Logout</li></Link>}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/logout" element={<Logout />}/>
          <Route path="/:id" element={<DogPage />} />
          <Route path="/dogs" element={<PersonList />} />
          <Route path="/add-dog" element={<AddDog />} />
          <Route path='/:id/edit' element={<EditDog />} />
          <Route path='/:id/delete' element={<DeleteDog />} />
          <Route path='/todo' element={<TodoList />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
