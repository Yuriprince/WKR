import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host, {host2} from '../constants';
import '../styles/commons.css';
import "../styles/modals/modal.css";
import edit from '../assets/icons/edit.png';
import delete_src from '../assets/icons/trash.png';
import dropdown from '../assets/icons/dropdown.png';
import close from '../assets/icons/wbold_x.png';
import EditModal from './modals/EditModal';
import AddModal from './modals/AddModal';

const  Admin = (props) => {
  const [srcArray, setSrcArray] = useState([]);
  const [isDrop, setIsDrop] = useState(false);
  const [currentpage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [src, setSrc] = useState({});
  const [text, setText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const [categories, setCategories] = useState([]);
  const [domains, setDomains] = useState([]);
  const [publishes, setPublishes] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [newSrcs, setNewSrcs] = useState([]);
  const [editSrc, setEditSrc] = useState({});
  //const [isLoaded, setIsLoaded] = useState(false);

  const logOut = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('login_date');
    window.location.href = `${host2}/login`; 
  }

  const closeWindow = (value, setState) => {
    if(value && (value === 'modalarea flex' || 
       value === 'closeimg' ||
       value === 'sendbtn-close' || 
       value === 'center')) {
      setState(false); 
    }
  } 

  const closeEditDialog = (value) => closeWindow(value, setIsEditItemOpen);
  const closeDialog = (value) => closeWindow(value, setIsOpen); 

  /*const closeDeleteAllDialog = (value) => closeWindow(value, setIsDeleteOpen);  
  const closeDialog = (value) => closeWindow(value, setIsOpen);  
  const closeDelItemDialog = (value) => closeWindow(value, setIsRemItemOpen); */

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
    //console.log(mypages);
    return mypages;
  }
  
  const getPagingProducts = (koef, result) => {
    let numbers = result.length / 10;
    let start   = koef*10;
    let end     = koef*10 + 10 - 1;
    let final_sampling = [];
    /*console.log("result" + result);
    console.log("start " + start);
    console.log("end" + end);*/
  

    result.forEach(function(item, i) {
      if((i >= start) && (i< end))  {
        final_sampling.push(item);
      }
    });
  
    let sourceArray = final_sampling;
  
    return sourceArray;
  }

  const postQuery = (param) => {
    let srcUrl;
    const keyWord = text === '' ? 'all' : text;
    if(typeof(param) === "object")
      srcUrl = `${host}/api/sourcesfull/${keyWord}/`;
    else 
      srcUrl = `${host}/api/sourcesfull/${param}/`;
    axios.get(srcUrl).then(response => {
      console.log(response.data);
      setSrcArray(response.data);
    });
  }

  useEffect(() => {
    const srcUrl = `${host}/api/sourcesfull/all/`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    if (localStorage.getItem('token')) {
      axios.get(srcUrl, {
        headers
      }).then(response => {
        //alert(response.data);
        setSrcArray(response.data);
        setIsLoaded(true);
      }).catch(function(e){
        logOut();
      });

      axios.get(`${host}/api/categories/`, {
        headers
      }).then(response => {
        setCategories(response.data);
      });

      axios.get(`${host}/api/domains/`, {
        headers
      }).then(response => {
        setDomains(response.data);
      });

      axios.get(`${host}/api/authors/`, {
        headers
      }).then(response => {
        setAuthors(response.data);
      });

      axios.get(`${host}/api/publishes/`, {
        headers
      }).then(response => {
        setPublishes(response.data);
      });


    } else {
      logOut();
    }
  }, []);

  useEffect(() => {
    let sources = [];
    srcArray.map(p => {
      sources.push(p);
    });

    if(newSrcs.length > 0) {
      const newArray = sources.concat(newSrcs);
      setSrcArray(newArray);
    }

    if(editSrc) {
      const indexEditedSrc = sources.indexOf(src);
      sources.splice(indexEditedSrc, 1, editSrc);

      setSrcArray(sources);
    }

    setNewSrcs('');
  }, [newSrcs, editSrc]);

  if(isLoaded) {
    return (
      <div>
        <header onClick={(e) => closeDrop(e.target.className)}>
          <div className="panel">
            <p className="domain">Re:Finder - для администратора</p>
            <div className="search-area-admin">
              <div className="search-field">
                <button className="blue-btn res-btn" type="button"
                onClick={postQuery}>Найти</button>
                <input className="blue-input admin-inp" type="text" placeholder="Искать..."
                onChange={(e) => setText(e.target.value)}/>
              </div> 
            </div>
            <button type="button" onClick={() => setIsDrop(!isDrop)} className="nobody out">
                  {localStorage.getItem('currentUser')}<img className="small2" src={dropdown} 
                  onClick={() => setIsDrop(!isDrop)} alt="drop"/></button>
          </div>
          <div className={isDrop ? "dropdown-content block" : "dropdown-content"}>
              <a className="logoutLink" onClick={logOut} href="#">Выход</a>
            </div>
        </header>
        <main className="container container-admin" onClick={(e) => closeDrop(e.target.className)}>
            <div className="result-items">
              <p className="rescount">Найдено результатов: {srcArray.length}</p>
    
              {
                srcArray.length > 0 ?
                getPagingProducts(currentpage, srcArray).map(p => (
                  <div className="item item-admin" key={p.id}>
                    <div className="column">
                      <a href={p.link_url} className="namedoc">{p.annotation}</a>
                      <div className="info">
                        { (p.author !== null && p.publish_info !== null) &&
                        <>
                          <p className="author_and_date">{p.author.name + " "}   
                                  {p.author.surname + " "} 
                                  {p.author.patronomyc === "-" ? "" : 
                                  p.author.patronomyc}, 
                                  {p.publish_info.publish_year + " "}</p>
                          <p className="publish_place">{p.publish_info.publish_place}</p>
                        </>
                        }
                      </div>
                      <p className="description">{p.description}</p>
                      <p className="src">{p.link_url}</p>
                    </div>
          
                    <div className="actions">
                      <div className="circle edit">
                        <img className="small" src={edit} alt="edit source" 
                         onClick={() => {setSrc(p); setIsEditItemOpen(true);}}/>
                      </div>
                      <div className="circle delete">
                        <img className="small" src={delete_src} alt="delete source"/>
                      </div>
                    </div>
                  </div>
                )) :
                <div className="item item-admin">
                  <p className="white">Ничего не найдено</p>
                </div>
              }
    
    
            <div className="pages">
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
          
            <div className="right">
              <p>Сортировать по:</p>
              <select className="choose_category">
                <option>Релевантности</option>
                <option>Популярности</option>
                <option>Году издания</option>
              </select>
    
              <p>Порядок сортировки:</p>
              <select className="choose_category">
                <option>По возрастанию</option>
                <option>По убыванию</option>
              </select>
    
              <button className="blue-btn admin-btn" type="button"
                onClick={() => setIsOpen(true)}> Добавить ресурс</button>
              <button className="blue-btn admin-btn" type="button"> Проверка ресурсов на доступность</button>
              <button className="blue-btn admin-btn" type="button"> Добавить домен</button>
              <button className="blue-btn admin-btn" type="button"> Добавить категорию</button>
              <button className="blue-btn admin-btn" type="button"> Добавить автора</button>
              <button className="blue-btn admin-btn" type="button"> Добавить сведения об издании</button>
            </div>
        </main>
        <AddModal isOpen={isOpen} closeModal={closeDialog} setNewSrcs={setNewSrcs}/>
        <EditModal isOpen={isEditItemOpen} closeModal={closeEditDialog} currentSrc={src}
         domains={domains} categories={categories}
         authors={authors} publishes={publishes} setEditSrc={setEditSrc}/>
      </div>
    );
  } else {
    return <></>;
  }
}
export  default  Admin;
