//rafc (zkratka)
import React from 'react'
//import { Link } from 'react-router-dom'
import { HashLink as Link } from "react-router-hash-link";
//import { ReactComponent as AddIcon } from "C:/Users/vecko/jp_2.0/jp2_react/src/assets/add.svg";
import { IoMdAddCircle } from "react-icons/io";

export const AddButton = (props) => {
  return (
    // <Link to="/edit_material" className='floating-button'>
    //     <AddIcon />
    // </Link>
    <Link to={props.link} className="floating-button">
      {/* <AddIcon /> */}
      <IoMdAddCircle />
    </Link>
  );
}
