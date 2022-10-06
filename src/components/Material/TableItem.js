import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { ITEM_COLUMNS } from "./ItemColumns";
import Axios from "axios";

function TableItem() {
const [material, setMaterial] = useState([]);

useEffect(() => {
  getMaterial();
}, []);

const getMaterial = () => {
  Axios.get("/api/list_items/").then((res) => {
    setMaterial(res.data);
    console.log("Data načtena");
    console.log("res.data", res.data);
  });
};

  return (
    <div>
      {material && (
        <TableGlobal columns={ITEM_COLUMNS} dataAPI={material} type="item" />
      )}
    </div>
  );
}

export default TableItem;
