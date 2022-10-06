import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { STORAGE_COLUMNS } from "../Stock/StorageColumns";
import Axios from "axios";

function TableStorage() {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = () => {
    Axios.get("/api/list_storage/").then((res) => {
      //console.log("Storage", res.data);
      console.log("Data načtena");
      setStorage(res.data);
    });
  };

  return (
    <div>
      {storage && <TableGlobal 
      columns={STORAGE_COLUMNS} 
      dataAPI={storage}
      type="storage" />}
    </div>
  );
}

export default TableStorage;
