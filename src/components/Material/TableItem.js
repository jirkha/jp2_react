import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { ITEM_COLUMNS } from "./ItemColumns";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMaterial } from "../Store/Features/Material/materialSlice";
import { Popup } from "../Global/Other/Popup";
import AddItemForm from "./AddItemForm";

function TableItem() {

  const [openPopup, setOpenPopup] = useState(false);

useEffect(() => {
  dispatch(getMaterial());
}, []);

const material = useSelector((state) => state.material.data)
const load = useSelector((state) => state.material.loading);
const dispatch = useDispatch();


  return (
    <div>
      {material && (
        <TableGlobal
          columns={ITEM_COLUMNS}
          loadingState={load}
          dataAPI={material}
          type="item"
          name="materiál"
          setOpenPopup={setOpenPopup}
        />
      )}
      <Popup
        title="Vložení nového materiálu"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddItemForm setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
}

export default TableItem;
