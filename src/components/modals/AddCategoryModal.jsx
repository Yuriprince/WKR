import React, { useState, useEffect } from 'react';
import img from '../../assets/icons/wbold_x.png';
import axios from 'axios';
import host from '../../constants';


const AddCategoryModal = ({isOpen, closeModal}) => {
  const [isProcessChecked, setProcessChecked] = useState('process');

  const [url, setUrl] = useState('');
  const [selector, setSelector] = useState('');

  const [myClass, setMyClass] = useState('mysize');
  const [errorText, setErrorText] = useState('');
  const [authorsArray, setAuthorsArray] = useState([]);

  const [name, setName] = useState([]);
  const [code, setCode] = useState([]);

  const inpRef1 = React.createRef();
  const inpRef2 = React.createRef();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  const addCategory = () => {
    const data = {
      "name": name,
      "code": code,
    }
    axios.post(`${host}/api/categories/`, data, { headers });
  }

  const getCategories = () => {
    axios.get(`${host}/api/categories/`, { headers }).then(response => setAuthorsArray(response.data));
  }
  
  useEffect(() => {
    setMyClass('mysize');
    setErrorText(''); 
    setName('');
    setCode('');
    inpRef1.current.value = '';
    inpRef2.current.value = '';
    setAuthorsArray([]);
  },[isOpen]);
/* onClick={e => closeModal(e.target.className)} */
  return (
    <div className={isOpen ? "modalarea flex" : "modalarea"} onClick={e => closeModal(e.target.className)}>
      <div className="center">
        <button type="button" className="close">
          <img src={img} className="closeimg" alt="close"/></button>   
        <div className="modalwindow">
          <div className="modal-content">
            <div className="modal_header">
              <h3 className="edittitle">Добавить категорию</h3>
            </div>
            <div className="modal_main">
            <label>Наименование:</label>
            <input type="text" ref={inpRef1} onChange={e => setName(e.target.value)}/>
            <label>Код:</label>
            <input type="text" ref={inpRef2} onChange={e => setCode(e.target.value)}/>

              <button className="blue-btn admin-btn" 
                      onClick={addCategory}>Добавить</button>
              <button className="blue-btn admin-btn" 
                      onClick={getCategories}>Просмотреть категории</button>      

              <p>{authorsArray.length > 0 && `Найдено результатов: ${authorsArray.length}`}</p>
                      
              <p className="p-margin errortext">{errorText}</p>

              <div className={authorsArray.length > 0 ? "results vis" : ""}>
              {
                authorsArray.map(p => (
                <div class="item modal" key={p.id}>
                  <div class="column">
                    <p>{p.id}.{p.name}</p>
                    <p>{p.code}</p>
                  </div>
                </div>
                ))
              } 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
