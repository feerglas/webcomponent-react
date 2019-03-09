import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@stauffacher/sbbpoc/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));
defineCustomElements(window);
