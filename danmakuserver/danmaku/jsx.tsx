import * as React from 'react';
import ReactDOM from 'react-dom';
import Danmakus from './Danmakus';

ReactDOM.render(
  <div className="example">
    <Danmakus compiler="TypeScript" framework="React" />
  </div>,
  document.getElementById('example1')
);
