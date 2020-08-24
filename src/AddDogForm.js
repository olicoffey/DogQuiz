import React from 'react';
import "./AddDogForm.css";

class DogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            facts: [],
            factTemp: ''
        };
        this.onFieldChange =this.onFieldChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleAddDog =this.handleAddDog.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddDog(this.state);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleAddDog(event) {
        this.setState({
            facts: this.state.facts.concat([this.state.factTemp]),
            bookTemp: ''
        });
    }

    render() {
        return <form onSubmit= {this.handleSubmit}>
          <div className="AddDogForm_input">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value= {this.state.name} onChange={this.onFieldChange}/>
          </div>
          <div className="AddDogForm_input">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
          </div>
          <div className="AddDogForm_input">
            <label htmlFor="factTemp">Facts</label>
              {this.state.facts.map((fact)=> <p key={fact}>{fact}</p>)}
            <input type="text" name="factTemp" value={this.state.factTemp} onChange={this.onFieldChange}/>
            <input type="button" value="+" onClick = {this.handleAddDog} />
          </div>
          <input type="submit" value="Add" />
      </form>
    }
}

function AddDogForm({match, onAddDog}) {
    return <div className="AddDogForm"> 
      <h1>Add Dog</h1>
      <DogForm onAddDog= {onAddDog} />

    </div>
  }



  export default AddDogForm;