import React, { useState, useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { REMOVAL_COLUMNS } from "./RemovalColumns";
import Axios from "axios";

function TableRemoval() {
  const [removal, setRemoval] = useState([]);

  useEffect(() => {
    getRemoval();
  }, []);

  const getRemoval = () => {
    Axios.get("/api/list_removal/").then((res) => {
      //console.log("Storage", res.data);
      console.log("Data načtena");
      setRemoval(res.data);
    });
  };

  return (
    <div>
      {removal && (
        <TableGlobal
          columns={REMOVAL_COLUMNS}
          dataAPI={removal}
          type="removal"
        />
      )}
    </div>
  );
}

export default TableRemoval;
