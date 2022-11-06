import React, { useState, useEffect, useMemo } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { STORAGE_COLUMNS } from "../Stock/StorageColumns";
import { useDispatch, useSelector } from "react-redux";
import { getStorage } from "../Store/Features/Material/storageSlice";
import { loading } from "../Store/Features/Material/storageSlice";

function TableStorage() {
  
  useEffect(() => {
    dispatch(getStorage());
  }, []);

const storage_pre = useSelector((state) => state.storage.data);
const storage = useMemo(() => storage_pre);
const load = useSelector(loading);

  const dispatch = useDispatch();

  return (
    <div>
      {storage && (
        <TableGlobal
          columns={STORAGE_COLUMNS}
          dataAPI={storage}
          loadingState={load}
          type="storage"
          name="naskladnění"
        />
      )}
    </div>
  );
}

export default TableStorage;
