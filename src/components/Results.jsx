import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host from '../constants';

import '../styles/commons.css';

const  Results = (props) => {
  return (
    <div class="container container-res">
      <div class="search-field">
        <p class="subtitle1 sub1-res">RE:</p>
        <button class="blue-btn res-btn" type="button">Найти</button>
        <input class="blue-input res-inp" type="text" placeholder="Искать..."/>
        <div class="sort">
          <p>Сортировать по:</p>
          <select class="choose_category">
            <option>Релевантности</option>
            <option>Популярности</option>
            <option>Году издания</option>
          </select>
        </div>
      </div> 
      <div class="result-items">
        <p>Найдено результатов: 321</p>
        

        <div class="item">
          <a href="#" class="namedoc">Функциональные требования</a>
          <div class="info">
            <p class="author_and_date">Григорьев А.Н., 2017 год</p>
            <p class="publish_place">Издательский дом "Питер"</p>
          </div>
          <p class="description">В современном мире трудно обойтись без результатов...</p>
          <p class="src">http://ara.com/</p>
        </div>

        <div class="item">
          <a href="#" class="namedoc">Функциональные требования</a>
          <div class="info">
            <p class="author_and_date">Григорьев А.Н., 2017 год</p>
            <p class="publish_place">Издательский дом "Питер"</p>
          </div>
          <p class="description">В современном мире трудно обойтись без...</p>
          <p class="src">http://ara.com/</p>
        </div>

        <div class="item">
          <a href="#" class="namedoc">Функциональные требования</a>
          <div class="info">
            <p class="author_and_date">Григорьев А.Н., 2017 год</p>
            <p class="publish_place">Издательский дом "Питер"</p>
          </div>
          <p class="description">В современном мире трудно обойтись без...</p>
          <p class="src">http://ara.com/</p>
        </div>

        <div class="pages">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#" class="lined">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">...</a>
        </div>

      </div>

    </div>
  );
}

export  default  Results;