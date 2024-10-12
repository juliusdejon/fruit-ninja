import React from 'react';

import FruitList from './app/fruit-list';
import Jar from './app/jar';

import './App.css';


function App() {


  return (
    <div className="flex items-center justify-center h-screen">
      <div className='flex w-1/2 justify-between' >
        <FruitList />
        <Jar />
      </div>
    </div>
  );
}

export default App;
