import  React, { useState, useEffect } from  'react';
import axios from 'axios';
import host from '../constants';
import '../styles/login.css';

const handleLogin = (userName, password, SetLoggedUser, setError) => {
  const data = {
    username: userName,
    password,
  }
  const url = `${host}/token-auth/`;
  axios.post(url, data).then(response => response.data).then(function (result) {
    localStorage.setItem('currentUser', data.username);
    localStorage.setItem('token', result.access);
    localStorage.setItem('refresh_token', result.refresh);
    localStorage.setItem('login_date', new Date());

    SetLoggedUser({logged_in: true,
                   username: data.username});
  })
  .catch(function (error) {
    setError();
  });
}

const  Login = (props) => {

  const [isLoggedUser, SetLoggedUser] = useState({logged_in: 
                                                  localStorage.getItem('token') ? true : false, 
                                                  username: ''});
  const [userName, SetUserName] = useState({username: ''});
  const [password, SetPassword] = useState({password: ''});
  const [myclassName, setclassName] = useState('mysize');
  const [errorText, setErrorText] = useState('');

  const setError = () => {
    setclassName('error');
    setErrorText('Неверное имя пользователя или пароль!'); 
  }
                                                
  useEffect(()=>{
    if (isLoggedUser.logged_in) {
      props.history.push('/admin');
    }
  },[isLoggedUser]);
  return (
    <div id="logincontainer">
      <form id="login">
        <div className="title-login">
          <p className="subtitle1-login">RE:</p>
          <p className="subtitle2-login">finder</p>
        </div> 
        <h2>Вход для администратора</h2>
        <label>Логин:</label>
        <input className={myclassName} type="text" onChange={(e) => SetUserName(e.target.value)}/>
        <label>Пароль:</label>
        <input className={myclassName} type="password" onChange={(e) => SetPassword(e.target.value)}/>
        <button type="button" onClick={() => handleLogin(userName,password, SetLoggedUser, setError)} 
                              className="sendbtn">ВОЙТИ</button>
        <p className="p-margin errortext">{errorText}</p>
      </form>
    </div>
  );
}

export  default  Login;
