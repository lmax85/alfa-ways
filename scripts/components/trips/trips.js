/**
 * 
 */
'use strict';

import React from 'react';

class Trips extends React.Component {
 
  render() {
    return (
      <div>
        {'Absolute Menu Items'}
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
    );
  }
}

Trips.defaultProps = { initialCount: 4 };

export default Trips;