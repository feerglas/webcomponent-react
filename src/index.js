import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { defineCustomElements } from '@stauffacher/sbbpoc/dist/loader';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
defineCustomElements(window);

serviceWorker.register();
