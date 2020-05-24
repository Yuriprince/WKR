import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host from '../constants';
//import '../styles/main.css';
import '../styles/commons.css';

const  Main = (props) => {
  return (
    <div class="container container-main">
      <div class="search-area">
        <div class="title">
          <p class="subtitle1 sub1-main">RE:</p>
          <p class="subtitle2">finder</p>
        </div> 
        <div class="search-field">
          <button class="blue-btn main-btn" type="button">Найти</button>
          <input class="blue-input main-inp" type="text" placeholder="Искать..."/>
        </div>
      </div>
    </div>
  );
}

export  default  Main;
