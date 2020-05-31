import React, { useState, useEffect } from 'react';
import img from '../../assets/icons/wbold_x.png';
import axios from 'axios';
import host from '../../constants';

/*const editValue = (e, editTask) => {

  const {currentId, status, description, close, showError, userId, setEditedTask} = editTask;

  if(!description || !status) {
    showError();
  } else {
    const url = `${host}/api/tasks/${currentId}/`;
    axios.put(url, {
        id: currentId,
        description: description,
        status: status,
        user: userId,
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
        },
      }
    ).then(response => {
      setEditedTask(response.data);
    });

    close(`${e.target.className}-close`);
  }
}*/

const EditModal = ({isOpen, closeModal, currentSrc}) => {

  const [isProcessChecked, setIsProcessChecked] = useState('process');
  const [text, setText] = useState('');
  const [myСlassName, setMyСlassName] = useState('mysize');
  const [errorText, setErrorText] = useState('');

  const setError = () => {
    setMyСlassName('error');
    setErrorText('Error! All fields must be checked/filled!'); 
  }

  const setCheck = (value) => setIsProcessChecked(value);

  const clickEditVal = (e) => {
    
    /*const editTask = {
      currentId: currentSrc.id,
      status: isProcessChecked,
      description: text,
      close: closeModal,
      showError: setError,
      userId: currentSrc.user,
      setEditedTask,
    }

    if(isProcessChecked === currentSrc.status && 
       text === currentSrc.description) {
      closeModal(`${e.target.className}-close`);
    } else {
      editValue(e, editTask);
    }*/
  }
  
  useEffect(() => {
    setMyСlassName('mysize');
    setErrorText('');
    console.log(currentSrc);

    



    /*setText(currentSrc.description);
    setIsProcessChecked(currentSrc.status);*/
  },[isOpen, currentSrc]);

  return (
    <div className={isOpen ? "modalarea flex" : "modalarea"} onClick={e => closeModal(e.target.className)}>
    <div className="center">
      <button type="button" className="close">
        <img src={img} className="closeimg" alt="close"/></button>   
      <div className="modalwindow">
        <div className="modal-content">
          <div className="modal_header">
            <h3 className="edittitle">Редактировать ресурс</h3>
          </div>
          <div className="modal_main">
            <label>Аннотация:</label>
            <input type="text" defaultValue={currentSrc.annotation}/>
            <label>Описание:</label>
            <input type="text" defaultValue={currentSrc.description}/>
            <label>Ссылка на ресурс:</label>
            <input type="text" value={currentSrc.link_url}/>
            
            <label>Автор:</label>
            <select className="choose_category">
              <option value="" selected disabled hidden>Не выбрано</option>
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <label>Домен:</label>
            <select className="choose_category">
            <option value="" selected disabled hidden>Не выбрано</option>
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <label>Категория:</label>
            <select className="choose_category">
            <option value="" selected disabled hidden>Не выбрано</option>
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <label>Место и год издания:</label>
            <select className="choose_category">
              <option value="" selected disabled hidden>Не выбрано</option>
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <button className="sendbtn" onClick={e => clickEditVal(e, currentSrc)}>Сохранить</button>
            <p className="p-margin errortext">{errorText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EditModal;
