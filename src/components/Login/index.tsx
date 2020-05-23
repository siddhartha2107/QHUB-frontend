import React from 'react'
import { ReactComponent  as Loginassset1} from '../../assets/login-asset1.svg'

import './styles.css';
import {Infoconnect} from '../Infoconnect';


export interface Ilogin{
  Page:number;
  PageHandler:(arg0:number)=>void;
}

export const Login:React.FC<Ilogin>=(props:Ilogin)=>{
  return(
      <div id="login">
      
        <div id="login-left">
          <Loginassset1 />
        </div>
        <div id="login-right">
          <span id="login-title">Welcome to Q-Hub</span>
          <span id="login-text">
            This a portal for teacher-student communication
            regarding the daily assignment and other perks
            in the pain points of education system.
          </span>
          <Infoconnect  Page={props.Page}
                        PageHandler={props.PageHandler}/>
          <button id="login-email">Log in with Email ID</button>
          <span id="login-bottom">The European languages are members of the same family. Their separate existence is a myth.</span>
        </div>
      </div>
    )
}