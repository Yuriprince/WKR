import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host, {host2} from '../constants';
import '../styles/commons.css';
import edit from '../assets/icons/edit.png';
import delete_src from '../assets/icons/trash.png';
import dropdown from '../assets/icons/dropdown.png';
import close from '../assets/icons/wbold_x.png';

const  Admin = (props) => {
  const [user, setUser] = useState(localStorage.getItem('currentUser'));
  const [isRefreshToken, setRefreshToken] = useState(localStorage.getItem('token'));
  const [isLoggedUser, SetLoggedUser] = useState({logged_in: isRefreshToken ? true : false,username: ''});
  const [isOpen, setIsOpen] = useState(false);
  const [srcArray, setSrcArray] = useState([]);
  const [isDrop, setIsDrop] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);  
  }

  const logOut = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('login_date');
    window.location.href = `${host2}/login`; 
  }

  const closeDrop = (value) => {
    if((value !== 'nobody out') && (value !== 'small2'))
      setIsDrop(false);
  }

  useEffect(() => {
    const srcUrl = `${host}/api/sources/`;

    if (isLoggedUser.logged_in) {
      axios.get(srcUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isRefreshToken}`
        }
      }).then(response => {
        console.log(response.data);
        setSrcArray(response.data);
      }).catch(function(e){
        /*const url = `${host}/api/refresh/`;
        axios.post(url,`refresh=${localStorage.getItem('refresh_token')}`)
        .then(response => { 
          console.log(response.data.access);
          localStorage.removeItem('token', response.data.access);
          setRefreshToken(response.data.access);
        });*/
        props.history.push('/login');
      });





    } else {
      props.history.push('/login');
    }
  }, []);

  return (
  <div>
    <header onClick={(e) => closeDrop(e.target.className)}>
      <div class="panel">
        <p class="domain">Re:Finder - для администратора</p>
        <div class="search-area-admin">
          <div class="search-field">
            <button class="blue-btn res-btn" type="button">Найти</button>
            <input class="blue-input admin-inp" type="text" placeholder="Искать..."/>
          </div> 
        </div>
        <button type="button" onClick={() => setIsDrop(!isDrop)} className="nobody out">
              {user}<img className="small2" src={dropdown} 
              onClick={() => setIsDrop(!isDrop)} alt="drop"/></button>
      </div>
      <div className={isDrop ? "dropdown-content block" : "dropdown-content"}>
          <a className="logoutLink" onClick={logOut} href="#">Выход</a>
        </div>
    </header>
    <div class="container container-admin" onClick={(e) => closeDrop(e.target.className)}>
        <div class="result-items">
          <p class="rescount">Найдено результатов: {srcArray.length}</p>

          {
            srcArray.length > 0 ?
            srcArray.map(p => (
              <div class="item item-admin" key={p.id}>
                <div class="column">
                  <a href="http://jozo.com/" class="namedoc">{p.annotation}</a>
                  <div class="info">
                    <p class="author_and_date">Григорьев А.Н., 2017 год</p>
                    <p class="publish_place">Издательский дом "Питер"</p>
                  </div>
                  <p class="description">{p.description}</p>
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
            )) :
            <p className="white">Пока не добавлено ни одного ресурса</p>
          }


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