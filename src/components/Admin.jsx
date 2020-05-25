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
  const [authorArray, setAuthorArray] = useState([]);
  const [adminArray, setAdminArray] = useState([]);
  const [domainArray, setDomainArray] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [publishArray, setPublishArray] = useState([]);
  const [isDrop, setIsDrop] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [currentpage, setCurrentPage] = useState(0);

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

  const getPages = (result) => {

    let res = result.length !== 0 ? result : [];
  
    //let data_sampling = [];

    let elements = result.length / 10;
    let mypages  = [];
  
    if(!Number.isInteger(elements))
    {
      elements = Math.trunc(elements);
      elements++;
    }
  
    for(let i = 1; i <= elements; i++) {
      mypages.push(i);
    }
    console.log(mypages);
    return mypages;
  }
  
  const getPagingProducts = (koef, result) => {
    let numbers = result.length / 10;
    let start   = koef*10;
    let end     = koef*10 + 10 - 1;
    let final_sampling = [];
    console.log("result" + result);
    console.log("start " + start);
    console.log("end" + end);
  

    result.forEach(function(item, i) {
      if((i >= start) && (i< end))  {
        final_sampling.push(item);
      }
    });
  
    let sourceArray = final_sampling;
  
    return sourceArray;
  }

  useEffect(() => {
    const srcUrl = `${host}/api/sourcesfull/`;

    if (isLoggedUser.logged_in) {
      axios.get(srcUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isRefreshToken}`
        }
      }).then(response => {
        console.log(response.data)
        setSrcArray(response.data);
      }).catch(function(e){
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
              getPagingProducts(currentpage, srcArray) > 0 ?
              getPagingProducts(currentpage, srcArray).map(p => (
                <div class="item item-admin" key={p.id}>
                  <div class="column">
                    <a href="#" class="namedoc">{p.annotation}</a>
                    <div class="info">
                      <p class="author_and_date">{p.author.name + " "}   
                                                 {p.author.surname + " "} 
                                                 {p.author.patronomyc === "-" ? "" : 
                                                  p.author.patronomyc}, 
                                                 {p.publish_info.publish_year + " "}</p>
                      <p class="publish_place">{p.publish_info.publish_place}</p>
                    </div>
                    <p class="description">{p.description}</p>
                    <p class="src">{p.domain}</p>
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
          {
            getPages(srcArray).map(p => ( 
              <a key={p} href="#" className={currentpage === p-1 ? "lined" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage(p-1);
                }}
                >{p}
              </a>
            ))
          }
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

/*            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#" class="lined">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#">...</a> */