import React from 'react';

import PropTypes from 'prop-types'
import './App.css';
import './bootstrap.min.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Hero() {
  return (<div className="row">
  <div className="jumbotron col-10 offset-1">
    <h1>Dog Quiz</h1>
    <p>Select the facts about the dog shown</p>
  </div>
    </div>);
}

function Fact({title, onClick}) {
return (<div className="answer" onClick={() => {onClick(title);}}>
  <h4>{title}</h4>

</div>);
}

function Turn({dog, facts, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }


  return(<div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src= {dog.imageUrl} className="authorImage" alt="Dog"/>
    </div>
    <div className="col-6">
      {facts.map((title) => <Fact title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>)
}

Turn.propTypes = {
  dog: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    facts: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  facts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

 function Continue ({show, onContinue}) {
   return(
     <div className="row continue">
       {show
          ? <div className= "col-11">
            <button className="btn btn-primary btn-lg float-right" value="Continue" onClick= {onContinue}> Continue </button>
            </div>
            : null}
       
     </div>
   );
 }

function Footer() {
  return (<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">
        All images are taken by Oliver on a Pixel
      </p>

    </div>
  </div>)
}

function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
  return (
  <div className="container-fluid"> 
    <Hero />
     <Turn {...turnData} highlight ={highlight} onAnswerSelected={onAnswerSelected} />
    <Continue show={highlight ==='correct'} onContinue={onContinue}/> 
    <p><Link to="/add">Add a dog</Link></p>
    <Footer />
  </div>
  );
}

export default AuthorQuiz;
