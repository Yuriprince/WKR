import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host from '../constants';

import '../styles/commons.css';

const  Results = (props) => {

  const [srcArray, setSrcArray] = useState('');
  const [currentpage, setCurrentPage] = useState(0);
  const [text, setText] = useState(localStorage.getItem('query'));

  const sortArray = ['Аннотации','Описанию', 'Релевантности', 'Автору', 'Году издания'];
  const ascArray = ['возрастанию', 'убыванию'];

  const [sortParam, setSortParam] = useState('Аннотации');
  const [ascending, setAscending] = useState('возрастанию');

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

  const postQuery = () => {
    let srcUrl;
    const keyWord = text === '' ? 'all' : text;
    /*if(typeof(param) === "object")
      srcUrl = `${host}/api/sourcesfull/${keyWord}_${sortParam}_${ascending}/`;
    else 
      srcUrl = `${host}/api/sourcesfull/${param}_${sortParam}_${ascending}/`;*/
    
    srcUrl = `${host}/api/sourcesfull/${keyWord}_${sortParam}_${ascending}/`;
    axios.get(srcUrl).then(response => {
      console.log(response.data);
      setSrcArray(response.data);
    });
  }

  useEffect(() => {
    postQuery();
  }, [sortParam, ascending]);

  return (
    <div className="container container-res">
      <div className="search-field">
        <p className="subtitle1 sub1-res">RE:</p>
        <button className="blue-btn res-btn" type="button" onClick={postQuery}>Найти</button>
        <input className="blue-input res-inp" type="text" placeholder="Искать..."
          onChange={(e) => setText(e.target.value)} />
        <div className="sort">
          <p>Сортировать по:</p>
          <select className="choose_category" onChange={(e) => setSortParam(e.target.value)}>
          {
            sortArray.map(p => (
              <option value={p}>{p}</option>
            ))
          }
          </select>

          <p>Порядок сортировки:</p>
          <select className="choose_category" onChange={(e) => setAscending(e.target.value)}>
            {
              ascArray.map(p => (
                <option value={p}>{p}</option>
              ))
            }
          </select>
        </div>
      </div> 
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
            </div>
          )) :
          <p className="white">Пока не добавлено ни одного ресурса</p>
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

    </div>
  );
}

export  default  Results;