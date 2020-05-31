import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host from '../constants';

import '../styles/commons.css';

const  Results = (props) => {

  const [srcArray, setSrcArray] = useState('');
  const [isRefreshToken, setRefreshToken] = useState(localStorage.getItem('token'));
  const [currentpage, setCurrentPage] = useState(0);
  const [text, setText] = useState('');
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

  const postQuery = (param) => {
    let srcUrl;
    if(typeof(param) === "object")
      srcUrl = `${host}/api/sourcesfull/${text}/`;
    else 
      srcUrl = `${host}/api/sourcesfull/${param}/`;
    axios.get(srcUrl).then(response => {
      console.log(response.data)
      setSrcArray(response.data);
    });
  }

  useEffect(() => {
    postQuery(props.match.params.keyword);
  }, []);

  return (
    <div class="container container-res">
      <div class="search-field">
        <p class="subtitle1 sub1-res">RE:</p>
        <button class="blue-btn res-btn" type="button" onClick={postQuery}>Найти</button>
        <input class="blue-input res-inp" type="text" placeholder="Искать..."
          onChange={(e) => setText(e.target.value)} />
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
        <p class="rescount">Найдено результатов: {srcArray.length}</p>
        {
          srcArray.length > 0 ?
          getPagingProducts(currentpage, srcArray).map(p => (
            <div class="item item-admin" key={p.id}>
              <div class="column">
                <a href={p.link_url} class="namedoc">{p.annotation}</a>
                <div class="info">
                  { (p.author !== null && p.publish_info !== null) &&
                  <>
                    <p class="author_and_date">{p.author.name + " "}   
                            {p.author.surname + " "} 
                            {p.author.patronomyc === "-" ? "" : 
                             p.author.patronomyc}, 
                            {p.publish_info.publish_year + " "}</p>
                    <p class="publish_place">{p.publish_info.publish_place}</p>
                  </>
                  }
                </div>
                <p class="description">{p.description}</p>
                <p class="src">{p.link_url}</p>
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

    </div>
  );
}

export  default  Results;