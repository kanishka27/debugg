import { runWithAdal } from 'react-adal';
import { authContext } from './config/adalConfig';
import IndexApp from './indexApp';
import ReactDOM from 'react-dom';
import React from 'react'

const DO_NOT_LOGIN = true;
 
runWithAdal(authContext, () => {  
  
  ReactDOM.render(<IndexApp />, document.getElementById('root'));
 
},DO_NOT_LOGIN);
