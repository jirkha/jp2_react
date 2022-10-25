import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { ITEM_COLUMNS } from "./ItemColumns";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMaterial } from "../Store/Features/Material/materialSlice";

function TableItem() {
// const [material, setMaterial] = useState([]);

// useEffect(() => {
//   getMaterial();
// }, []);

useEffect(() => {
  dispatch(getMaterial());
}, []);

const material = useSelector((state) => state.material.data)

const dispatch = useDispatch();



// const getMaterial = () => {
//   Axios.get("/api/list_items/")
//   .then((res) => {
//     setMaterial(res.data);
//     console.log("Data načtena");
//     console.log("res.data", res.data);
//   });
// };

  return (
    <div>
      {material && (
        <TableGlobal columns={ITEM_COLUMNS} dataAPI={material} type="item" />
      )}
    </div>
  );
}

export default TableItem;
