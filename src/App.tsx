import React from 'react';
import {Top} from './components/Top/index'
import {Body} from './components/Body/index'

import './App.css';

const App:React.FC=() => {
  const [page,setPage]= React.useState(1)
  return (
    <div className="App">
      <Top Page={page}/>
      <Body Page={page}
            PageHandler={setPage} />
    </div>
  );
}

export default App;
