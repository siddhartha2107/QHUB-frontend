import React from 'react'
import {Login} from '../Login/index'

import './styles.css';

export interface INav{
    Page:number;
    PageHandler:(arg0:number)=>void;
}


export const Nav:React.FC<INav>=(props:INav)=>{
    const arr=[1,1,1,1,1,1,1,1];
    arr[props.Page-2]=2;    
    if(props.Page==1){
        return (
            <>
            </>
        )
    }
    else return(
        <nav>
            
            <div className="nav-tabs">
                    <button role='nav-tab' className={"btn-"+arr[0]} onClick={()=>props.PageHandler(2)}>Add Subject</button>
                    <button role='nav-tab' className={"btn-"+arr[1]} onClick={()=>props.PageHandler(3)}>Add Unit</button>
                    <button role='nav-tab' className={"btn-"+arr[2]} onClick={()=>props.PageHandler(4)}>Add Question</button>
                    <button role='nav-tab' className={"btn-"+arr[3]} onClick={()=>props.PageHandler(5)}>Assignment</button>
                    {/* <button role='nav-tab' className={"btn-"+arr[4]} onClick={()=>props.PageHandler(6)}>Question Paper</button> */}
                    {/* <button role='nav-tab' className={"btn-"+arr[5]} onClick={()=>props.PageHandler(7)}>Profile</button> */}
            </div>
        </nav>
    )
}