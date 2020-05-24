import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host from '../constants';
import '../styles/commons.css';
import edit from '../assets/icons/edit.png';
import delete_src from '../assets/icons/trash.png';
import dropdown from '../assets/icons/dropdown.png';
import close from '../assets/icons/wbold_x.png';
const  Admin = (props) => {
  return (
  <div>
    <header>
      <div class="panel">
        <p class="domain">Re:Finder - для администратора</p>
        <div class="search-area-admin">
          <div class="search-field">
            <button class="blue-btn res-btn" type="button">Найти</button>
            <input class="blue-input admin-inp" type="text" placeholder="Искать..."/>
          </div> 
        </div>
        <button class="nobody" type="button"> Сергей Щецин
          <img class="small2" src={dropdown}/>
        </button>
      </div>
      <div class="dropdown-content">
        <a class="logoutLink" href="#">Logout</a>
      </div>
    </header>
    <div class="container container-admin">
        <div class="result-items">
          <p class="rescount">Найдено результатов: 321</p>
          <div class="item item-admin">
            <div class="column">
              <a href="#" class="namedoc">Функциональные требования</a>
              <div class="info">
                <p class="author_and_date">Григорьев А.Н., 2017 год</p>
                <p class="publish_place">Издательский дом "Питер"</p>
              </div>
              <p class="description">В современном мире трудно обойтись без современных способ исследования...</p>
              <p class="src">http://ara.com/</p>
            </div>
  
            <div class="actions">
              <div class="circle edit">
                <img class="small" src={edit} alt="edit source"/>
              </div>
              <div class="circle delete">
                <img class="small" src={delete_src} alt="delete source"/>
              </div>
            </div>
          </div>

          <div class="item item-admin">
            <div class="column">
              <a href="#" class="namedoc">Функциональные требования</a>
              <div class="info">
                <p class="author_and_date">Григорьев А.Н., 2017 год</p>
                <p class="publish_place">Издательский дом "Питер"</p>
              </div>
              <p class="description">В современном мире трудно обойтись без современных способ исследования...</p>
              <p class="src">http://ara.com/</p>
            </div>
  
            <div class="actions">
              <div class="circle edit">
                <img class="small" src={edit} alt="edit source"/>
              </div>
              <div class="circle delete">
                <img class="small" src={delete_src} alt="delete source"/>
              </div>
            </div>
          </div>

          <div class="item item-admin">
            <div class="column">
              <a href="#" class="namedoc">Функциональные требования</a>
              <div class="info">
                <p class="author_and_date">Григорьев А.Н., 2017 год</p>
                <p class="publish_place">Издательский дом "Питер"</p>
              </div>
              <p class="description">В современном мире трудно обойтись без современных способ исследования...</p>
              <p class="src">http://ara.com/</p>
            </div>
  
            <div class="actions">
              <div class="circle edit">
                <img class="small" src={edit} alt="edit source"/>
              </div>
              <div class="circle delete">
                <img class="small" src={delete_src} alt="delete source"/>
              </div>
            </div>
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
      
        <div class="right">
          <p>Сортировать по:</p>
          <select class="choose_category">
            <option>Релевантности</option>
            <option>Популярности</option>
            <option>Году издания</option>
          </select>

          <p>Порядок сортировки:</p>
          <select class="choose_category">
            <option>По возрастанию</option>
            <option>По убыванию</option>
          </select>

          <button class="blue-btn admin-btn" type="button"> Добавить ресурс</button>
          <button class="blue-btn admin-btn" type="button"> Проверка ресурсов на доступность</button>
          <button class="blue-btn admin-btn" type="button"> Поиск нерелевантных ресурсов</button>
        </div>
    </div>
  </div>
  );
}

export  default  Admin;