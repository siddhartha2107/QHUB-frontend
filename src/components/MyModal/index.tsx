import React, { Dispatch } from 'react'
import './styles.css'
import Modal from 'react-modal'
export interface Imodal{
    ModalIsOpen:boolean,
    ModalHandler:(arg0:boolean)=>void;
    ModalBody:any
}
export const MyModal:React.FC<Imodal>=(props:Imodal)=>{
    const [modalIsOpen,setIsOpen] = React.useState(false);
	function openModal() {
		props.ModalHandler(true);
    }
    function closeModal(){
        props.ModalHandler(false);
    }

	var modalStyle:any={
		overlay:{
			backgroundColor:"#666666",
			zIndex:1,
			opacity:"0.97"
		},
		content:{
			backgroundColor:"#EEEFEF",
			height:"46vh",
			width:"46vw",
			left:"50%",
			top:"50%",
			marginLeft:"-23vw",
			marginTop:"-23vh",
			position:"absolute",
			zIndex:1000
		}
	}
    return(
        <Modal 	isOpen={props.ModalIsOpen}
        		onRequestClose={closeModal}
				style={modalStyle} 
		>
			<div id="myModal">
				{props.ModalBody}
			</div> 
		</Modal>
    )
}