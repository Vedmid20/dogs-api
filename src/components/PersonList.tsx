import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
}

export default class PersonList extends React.Component {
  state = {
    persons: [] as Dog[]
  }

  componentDidMount() {
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      const dogs = res.data;
      this.setState({ persons: dogs });
    })
    .catch(error => {
      console.error('Error fetching dogs:', error);
      alert('Failed to fetch dogs');
    });
  }

  render() {
    return (
      <div className="form" style={{ marginTop: '10px' }}>
          <ul>
            {
              this.state.persons.map(person => (
                <div key={person._id}>
                  <Link to={`/${person._id}`}><li style={{marginBottom: '-2px', marginTop: '15px'}}>Dog: {person.name}</li></Link><hr />
                  <Link to={`/${person._id}/edit`} style={{ marginLeft: '10px'}}><li style={{marginBottom: '-10px'}}>{person.name}: Edit</li></Link>
                  <Link to={`/${person._id}/delete`} style={{ marginLeft: '10px'}}><li>{person.name}: Delete</li></Link>
                </div>
              ))
            }
          </ul>
      </div>
    )
  }
}