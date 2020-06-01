import React, { useState, useEffect } from 'react';
import img from '../../assets/icons/wbold_x.png';
import axios from 'axios';
import host from '../../constants';


const AddAuthorModal = ({isOpen, closeModal}) => {
  const [isProcessChecked, setProcessChecked] = useState('process');

  const [url, setUrl] = useState('');
  const [selector, setSelector] = useState('');

  const [myClass, setMyClass] = useState('mysize');
  const [errorText, setErrorText] = useState('');
  const [authorsArray, setAuthorsArray] = useState([]);

  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [patro, setPatro] = useState([]);
  const [email, setEmail] = useState([]);

  const inpRef1 = React.createRef();
  const inpRef2 = React.createRef();
  const inpRef3 = React.createRef();
  const inpRef4 = React.createRef();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  const addAuthor = () => {
    const data = {
      "name": name,
      "surname": surname,
      "patronomyc": patro,
      "email": email
    }
    axios.post(`${host}/api/authors/`, data, { headers });
  }

  const getAuthors = () => {
    axios.get(`${host}/api/authors/`, { headers }).then(response => setAuthorsArray(response.data));
  }
  
  useEffect(() => {
    setMyClass('mysize');
    setErrorText(''); 
    setName('');
    setSurname('');
    setPatro('');
    setEmail('');
    inpRef1.current.value = '';
    inpRef2.current.value = '';
    inpRef3.current.value = '';
    inpRef4.current.value = '';
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
              <h3 className="edittitle">Добавить автора</h3>
            </div>
            <div className="modal_main">
            <label>Имя:</label>
            <input type="text" ref={inpRef1} onChange={e => setName(e.target.value)}/>
            <label>Фамилия:</label>
            <input type="text" ref={inpRef2} onChange={e => setSurname(e.target.value)}/>
            <label>Отчество:</label>
            <input type="text" ref={inpRef3} onChange={e => setPatro(e.target.value)}/>
            <label>E-mail:</label>
            <input type="text" ref={inpRef4} onChange={e => setEmail(e.target.value)}/>

              <button className="blue-btn admin-btn" 
                      onClick={addAuthor}>Добавить</button>
              <button className="blue-btn admin-btn" 
                      onClick={getAuthors}>Просмотреть авторов</button>      

              <p>{authorsArray.length > 0 && `Найдено результатов: ${authorsArray.length}`}</p>
                      
              <p className="p-margin errortext">{errorText}</p>

              <div className={authorsArray.length > 0 ? "results vis" : ""}>
              {
                authorsArray.map(p => (
                <div class="item modal" key={p.id}>
                  <div class="column">
                    <p>{p.id}.{p.name} {p.surname} {p.patronomyc}</p>
                    <p>{p.email}</p>
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

export default AddAuthorModal;
