import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import {Button} from 'react-bootstrap'
import Axios from 'axios'

const MaterialPage = () => {

    let {materialId} = useParams();
    
    let [material, setMaterial] = useState(null)
    // console.log({material.updated})

    useEffect(()=> {
        getMaterial()
    }, [materialId])

    let getMaterial = async () => {
        let response = await fetch(`/api/item_detail/${materialId}`)
        let data = await response.json()
        setMaterial(data)
    }

    const postDelete = (id, e) => {
      e.preventDefault();
      Axios.delete(`/api/item_delete/${id}`)
      .then(res => console.log("Deleted!", res)
    ).catch(err => console.log(err))
  }
    
    return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft />
                </Link>
            </h3>
        </div>
        <p>{material?.m_ser.name}</p>
        <p>{material?.m_ser.created}</p>
        <p>{material?.m_ser.updated}</p>
        <p>{material?.m_ser.id}</p>
        <Button type='delete' onClick={(e) => postDelete(material?.m_ser.id, e)}>Vymazat</Button>
    </div>
  )
}

export default MaterialPage