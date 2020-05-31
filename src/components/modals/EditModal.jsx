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

const EditModal = ({isOpen, closeModal, currentTask, setEditedTask}) => {

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
      currentId: currentTask.id,
      status: isProcessChecked,
      description: text,
      close: closeModal,
      showError: setError,
      userId: currentTask.user,
      setEditedTask,
    }

    if(isProcessChecked === currentTask.status && 
       text === currentTask.description) {
      closeModal(`${e.target.className}-close`);
    } else {
      editValue(e, editTask);
    }*/
  }
  
  useEffect(() => {
    setMyСlassName('mysize');
    setErrorText('');
    /*setText(currentTask.description);
    setIsProcessChecked(currentTask.status);*/
  },[isOpen, currentTask]);

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
            <input type="text"/>
            <label>Описание:</label>
            <input type="text"/>
            <label>Ссылка на ресурс:</label>
            <input type="text"/>
            
            <label>Автор:</label>
            <select class="choose_category">
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <label>Домен:</label>
            <select class="choose_category">
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <label>Категория:</label>
            <select class="choose_category">
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <label>Место и год издания:</label>
            <select class="choose_category">
              <option>Релевантности</option>
              <option>Популярности</option>
              <option>Году издания</option>
            </select>

            <button className="sendbtn" onClick={e => clickEditVal(e, currentTask)}>Сохранить</button>
            <p className="p-margin errortext">{errorText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EditModal;
