import React, { useEffect } from 'react'
import './styles.css'

export interface Idropdown{
    Dropdown: string;
    DropDownItems: any[]
    DropdownHandler: (arg0:string)=>void;
    DefValue: string;
}

export const DropDown:React.FC<Idropdown>=(props:Idropdown)=>{
    const [data,setData] = React.useState([]);
    const dropdownItems:any= [];

    props.DropDownItems.forEach(x=>{
        // console.log(x)
        dropdownItems.push(<option>{x}</option>)
    })
    

    return(
    <div id="dropDownDiv">
        <span className="dropDownDivSpan">{props.DefValue}:-</span>
        <select id="chooseSubject" role="choose-subject-selector" onChange={(e)=>props.DropdownHandler(e.target.value)} >
            <option className="nav-top-select-default" value="default" selected disabled hidden>{props.DefValue}</option>
            {dropdownItems}
        </select> 
    </div>
    )
}