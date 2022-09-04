import React, {useState, useEffect} from 'react'
import ListMaterial from '../components/ListMaterial'
//imd(import)
import * as AddButton from '../components/AddButton'
import AddItemForm from "../components/AddItemForm";
import FormContainer from "../components/FormContainer";

function ListMaterialPage() {

  let [material, setMaterial] = useState([])
  let [materialType, setMaterialType] = useState([])

  useEffect(()=> {
    getMaterial();
    getMaterialType()
  }, [])

  let getMaterial = async () => {
    let response = await fetch('/api/list_items/')
    let data = await response.json()
    setMaterial(data)
  }
  
  let getMaterialType = async () => {
    let response = await fetch('/api/item_types/')
    let data = await response.json()
    //console.log(data)
    setMaterialType(data)
  }

  return (
    <div>
      <div className="notes">
        <div className="notes-header">
          <h2 className="notes-title">&#9782; Seznam materiálu</h2>
          {/* <p className='notes-count'>{material.m_ser.length}</p> */}
        </div>
        <div className="notes-list">
          {material.map((m_ser, index) => (
            <ListMaterial key={index} m_ser={m_ser} />
          ))}
        </div>
        <AddButton.AddButton link="#itemForm" />
      </div>
      <section id="itemForm">
        <div className="notes">
          <div className="notes-header">
            <FormContainer>
              <h2 className="notes-title">&#9782; Přidat materiál</h2>
              
               <div className="notes-list">
                <AddItemForm />
                </div>
            </FormContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListMaterialPage