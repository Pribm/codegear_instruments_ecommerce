import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { StateContext } from 'context/StateContext';

import './Global.css'


function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Component {...pageProps} />
    </StateContext>
  )
}

export default MyApp
