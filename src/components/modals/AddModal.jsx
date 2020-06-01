import React, { useState, useEffect } from 'react';
import img from '../../assets/icons/wbold_x.png';
import axios from 'axios';
import host from '../../constants';


const AddModal = ({isOpen, closeModal, setNewSrcs}) => {
  const [isProcessChecked, setProcessChecked] = useState('process');

  const [url, setUrl] = useState('');
  const [selector, setSelector] = useState('');

  const [myClass, setMyClass] = useState('mysize');
  const [errorText, setErrorText] = useState('');
  const [newSrcArray, setNewSrcArray] = useState([]);

  const inpRef1 = React.createRef();
  const inpRef2 = React.createRef();


  const findSrcElems = () => {

    const data = {
      url,
      selector
    };
    
    axios.post(`${host}/api/parse_sources/`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => {
      console.log(response.data);
      setNewSrcArray(response.data); 
      setErrorText('');
    }).catch(() => {
      setErrorText('Ошибка! Неверный адрес url или селектор!'); 
    });
  }

  const addSrcs = () => {
    let newArray = [];
    for(let i = 0; i < newSrcArray.length; i++) {
      const data = {
        "annotation": newSrcArray[i].title,
        "description": "-",
        "link_url": newSrcArray[i].url,
        "admin": 1,
        "author": null,
        "domain": null,
        "category": null,
        "publish_info": null
      }

      newArray.push(data);

      axios.post(`${host}/api/sources/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }).then(response => {
        console.log(`Added ${i} value`);
      });
    }
    setNewSrcs(newArray);
    closeModal('sendbtn-close');
  }

  const setCheck = (value) => setProcessChecked(value);
  
  useEffect(() => {
    setMyClass('mysize');
    setErrorText(''); 
    setUrl('');
    setSelector('');
    inpRef1.current.value = '';
    inpRef2.current.value = '';
    setNewSrcArray([]);
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
              <h3 className="edittitle">Добавить ресурс</h3>
            </div>
            <div className="modal_main">
            <label>URL-адрес:</label>
            <input type="text" ref={inpRef1} onChange={e => setUrl(e.target.value)}/>
            <label>Селектор:</label>
            <input type="text" ref={inpRef2} onChange={e => setSelector(e.target.value)}/>

              <button className="sendbtn" 
                      onClick={findSrcElems}>Найти</button>    

              <p>{newSrcArray.length > 0 && `Найдено результатов: ${newSrcArray.length}`}</p>
                      
              <p className="p-margin errortext">{errorText}</p>

              <div className={newSrcArray.length > 0 ? "results vis" : ""}>
              {
                newSrcArray.map(p => (
                <div class="item modal" key={p.id}>
                  <div class="column">
                    <a href={p.url} class="namedoc">{p.id}. {p.title}</a>
                    <p class="src">{p.url}</p>
                  </div>
                </div>
                ))
              } 
              </div>
              <button className={newSrcArray.length > 0 ? "sendbtn mar" : "sendbtn mar invis"}
                        onClick={addSrcs}>Добавить ресурсы</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
