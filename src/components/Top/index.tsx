import React from 'react'
import logo from '../../assets/globe.svg'
import './styles.css';

export interface ITop{
    Page:number;
}

export const Top:React.FC<ITop>=(props:ITop)=>{
    const logOut= ()=>{
        console.log("Logging Out")
        localStorage.removeItem('token');
        window.location.replace("http://localhost:3000")
    }
    return(
        <div className="top">
            <div className="top-left">
                <img src={logo} alt="Logo" />
                <span id="top-left-title">
                    Q-Hub
                </span>
            </div>
            <div className="top-right">
            {props.Page == 1 ?
                <>
                    <button id="top-right-upload">Upload Image</button>
                </>
                : <>
                    <button id="top-right-log" onClick={logOut}>Log Out</button>
                </>
            }
                
            </div>
        </div>
    )
}