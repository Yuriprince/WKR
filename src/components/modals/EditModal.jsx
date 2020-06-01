import React, { useState, useEffect } from 'react';
import img from '../../assets/icons/wbold_x.png';
import axios from 'axios';
import host from '../../constants';

const EditModal = ({isOpen, closeModal, currentSrc, domains, categories, authors, publishes, setEditSrc}) => {

  const [isProcessChecked, setIsProcessChecked] = useState('process');
  const [text, setText] = useState('');
  const [myСlassName, setMyСlassName] = useState('mysize');
  const [errorText, setErrorText] = useState('');

  const [domainId, setDomainId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [authorId, setAuthorId] = useState(0);
  const [publishId, setPublishId] = useState(0);

  const [newAnnotation, setNewAnnotation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');


  const setError = () => {
    setMyСlassName('error');
    setErrorText('Error! All fields must be checked/filled!'); 
  }

  const setCheck = (value) => setIsProcessChecked(value);

  const editSrc = () => {
    const data = {
      "annotation": newAnnotation,
      "description": newDescription,
      "link_url": newUrl,
      "admin": 1,
      "author": authorId ? authorId : null,
      "domain": domainId ? domainId : null,
      "category": categoryId ? categoryId : null,
      "publish_info": publishId ? publishId : null
    };

    const url = `${host}/api/sources/${currentSrc.id}/`;

    axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then(response => {
      setEditSrc(response.data);
      closeModal('sendbtn-close');
    });
  }

  const getId = (author) => {
    if((author !== undefined) && (author !== null) && (typeof author !== 'number'))
      return author.id;
    else return 0;
  }

  useEffect(() => {
    const defDom = getId(currentSrc.domain);
    const defCat = getId(currentSrc.category);
    const defAuth = getId(currentSrc.author);
    const defPub = getId(currentSrc.publish_info);
    setDomainId(defDom);
    setCategoryId(defCat); 
    setAuthorId(defAuth);
    setPublishId(defPub);


  }, [isOpen]);
  
  useEffect(() => {
    setMyСlassName('mysize');
    setErrorText('');
    //console.log(currentSrc);
    console.log(domains);
    console.log(categories);

    setNewAnnotation(currentSrc.annotation);
    setNewDescription(currentSrc.description);
    setNewUrl(currentSrc.link_url);



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
            <input type="text" defaultValue={currentSrc.annotation}
              onChange={(e) => setNewAnnotation(e.target.value)}/>
            <label>Описание:</label>
            <input type="text" defaultValue={currentSrc.description}
              onChange={(e) => setNewDescription(e.target.value)}/>
            <label>Ссылка на ресурс:</label>
            <input type="text" defaultValue={currentSrc.link_url}
              onChange={(e) => setNewUrl(e.target.value)}/>
            
            <label>Автор:</label>
            <select className="choose_category" onChange={(e) => setAuthorId(e.target.value)}>
              <option value="0">Не выбрано</option>
                {
                  authors.map(p => (
                    <option value={p.id} selected={authorId === p.id ? true : false} key={p.id}>{p.name} {p.surname}</option>
                  ))
                }
            </select>

            <label>Домен:</label>
            <select className="choose_category" onChange={(e) => setDomainId(e.target.value)}>
              <option value="">Не выбрано</option>
              {
                domains.map(p => (
                  <option value={p.id} selected={domainId === p.id ? true : false} key={p.id}>{p.name}</option>
                ))
              }
            </select>

            <label>Категория:</label>
            <select className="choose_category" onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Не выбрано</option>
              {
                categories.map(p => (
                  <option value={p.id} selected={categoryId === p.id ? true : false} key={p.id}>{p.name}</option>
                ))
              }
            </select>

            <label>Место и год издания:</label>
            <select className="choose_category" onChange={(e) => setPublishId(e.target.value)}>
              <option value="">Не выбрано</option>
                {
                  publishes.map(p => (
                    <option value={p.id} selected={publishId === p.id ? true : false} key={p.id}>{p.publish_place}, {p.publish_year}</option>
                  ))
                }
            </select>

            <button className="sendbtn" onClick={editSrc}>Сохранить</button>
            <p className="p-margin errortext">{errorText}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EditModal;
