import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host from '../constants';
//import '../styles/main.css';
import '../styles/commons.css';

const  Main = (props) => {

  const [text, setText] = useState('');

  const getResults = () => {
    props.history.push(`/results/${text}`);
  }

  return (
    <div class="container container-main">
      <div class="search-area">
        <div class="title">
          <p class="subtitle1 sub1-main">RE:</p>
          <p class="subtitle2">finder</p>
        </div> 
        <div class="search-field">
          <button class="blue-btn main-btn" type="button" onClick={getResults}>Найти</button>
          <input class="blue-input main-inp" type="text" placeholder="Искать..." 
           onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export  default  Main;
