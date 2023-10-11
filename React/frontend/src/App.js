import React, { useRef } from 'react';
import './App.css';

// import {UserPage} from './apps/UserPage'
// import {Counter} from './apps/Counter'
// import {Todo} from './apps/Todo'
// import {PredictAge} from './apps/PredictAge'

import {Home} from './apps/Home'
import {CatFact} from './apps/CatFact'
import {Excuse} from './apps/Excuse'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  let a = React.version;
  console.log(a);

  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/catfact' element={<CatFact/>}/>
          <Route path='/excuse' element={<Excuse/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
