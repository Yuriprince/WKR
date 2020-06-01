import React, { useEffect, useState } from 'react';
import img from '../../assets/icons/wbold_x.png';
import axios from 'axios';
import host from '../../constants';

const delValue = (e, id, closeModal, setDeleteSrc) => {
  const currentId = id;
  const url = `${host}/api/sources/${currentId}/`;
  axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
  }).then(response => {
    setDeleteSrc(id);
  });
  closeModal(`${e.target.className}-close`);
}

const delItem = (e, id, closeModal, setDeleteSrc) => delValue(e, id, closeModal, setDeleteSrc);

const DeleteItemModal = ({isOpen, closeModal, currentSrc, setDeleteSrc}) => {
  const [headerText, setHeaderText] = useState('');
  useEffect(() => {
    const h3Value = `Вы действительно хотите удалить `;
    setHeaderText(`${h3Value} ресурс:\n"${currentSrc.annotation}"?`);
  },[isOpen, currentSrc]);

  return (
    <div className={isOpen ? "modalarea flex" : "modalarea"} 
                    onClick={e => closeModal(e.target.className)}>
      <div className="center">
        <button type="button" className="close">
          <img src={img} className="closeimg" alt="close"/></button>   
        <div className="modalwindow">
          <div className="modal-content">
            <div className="modal_header">
              <h3 className="word" className="deltitle">{headerText}</h3>
            </div>
            <div className="modal_main">
              <button className="sendbtn" onClick={e => delItem(e, currentSrc.id, 
                                                                closeModal, setDeleteSrc)}>
                                                                Подтвердить</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}

export default DeleteItemModal;
