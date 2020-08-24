
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AuthorQuiz from './AuthorQuiz';
import AddDogForm from "./AddDogForm";
import {shuffle, sample} from 'underscore';


const dogs= [
  {
    name: 'Stella',
    imageUrl: 'images/dogs/stella.jpg',
    imageSource: 'Olivers phone',
    facts: [
      'Goes by Stell',
      'Best friend is cooper',
  ]
  },
  {
    name: 'Cooper',
    imageUrl: 'images/dogs/cooper.jpg',
    imageSource: 'Olivers phone',
    facts: [
      'Loves ice cubes and the car',
      'Probably the most relaxed dog on earth',
  ]
  },
  {
    name: 'Lou',
    imageUrl: 'images/dogs/lou.jpg',
    imageSource: 'Olivers phone',
    facts: [
      'Might like playing fetch more than any other dog',
      'Certified body guard',
  ]
  },
  {
    name: 'Leo',
    imageUrl: 'images/dogs/leo.jpg',
    imageSource: 'Olivers phone',
    facts: [
      'Currently looking for Logan',
      'Best cuddler',
  ]
  }

]

function getTurnData(dogs) {
  const allDogs = dogs.reduce(function (p,c,i) {
    return p.concat(c.facts);
  }, []);
  const fourRandomDogs = shuffle(allDogs).slice(0,4);
  const answer = sample(fourRandomDogs);

  return {
    facts: fourRandomDogs,
    dog: dogs.find((dog) => 
    dog.facts.some((title) => title === answer))
  }
}

function resetState() {
  return {
    turnData: getTurnData(dogs),
    highlight: ''
    }
}

let state = resetState();

  function onAnswerSelected(answer) {
    const isCorrect = state.turnData.dog.facts.some((fact) => fact === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
  }



  function App() {
   return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={()=> {
     state = resetState();
     render();
   }}/>
  }

  const DogWrapper= withRouter(({history}) =>
    <AddDogForm onAddDog = {(dog)=> {
      dogs.push(dog);
      history.push('/');
    }} />
  );
  

function  render() {
ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter> 
   <React.Fragment>
    <Route exact path= "/" component={App} /> 
    <Route path = "/add" component={DogWrapper} />
    </React.Fragment>
   </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
