import React, { useState } from "react";
import { Popup } from "../Global/Other/Popup";
import UpdateMadeProduct from "./UpdateMadeProduct";

const OpenP = (props) => {
  // } Open = (product) => {
  const [openPopup, setOpenPopup] = useState(false);
  console.log("product", props.product)

  return (
    <>
    <Popup
      title="Úprava počtu naskladněných výrobků"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <UpdateMadeProduct
        //id={product?.p_ser.id}
        //getProduct={props.getProduct}
        setOpenPopup={setOpenPopup}
      />
    </Popup>
    </>
  )
}
export default OpenP;