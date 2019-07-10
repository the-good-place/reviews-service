import React from 'react';
import Search from './Search';
import Rating from './Rating';
import Attributes from './Attributes';
import Reviews from './Reviews';
import {mockData} from '../sampleData';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>357 Reviews</h4>
          <Rating />
          <Search />
        </div>
        <hr />
        <Attributes />
        <Reviews reviews={mockData} />
      </div>
    )
  }
};

export default App;