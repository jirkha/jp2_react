import React, { useState, useEffect, useMemo } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { REMOVAL_COLUMNS } from "./RemovalColumns";
import { useDispatch, useSelector } from "react-redux";
import { getRemoval } from "../Store/Features/Material/removalSlice";

function TableRemoval() {

  useEffect(() => {
    dispatch(getRemoval());
  }, []);

const removal_pre = useSelector((state) => state.removal.data);
const removal = useMemo(() => removal_pre)
const load = useSelector((state) => state.removal.loading);

const dispatch = useDispatch();

  return (
    <div>
      {removal && (
        <TableGlobal
          columns={REMOVAL_COLUMNS}
          dataAPI={removal}
          loadingState={load}
          type="removal"
          name="vyskladnění"
        />
      )}
    </div>
  );
}

export default TableRemoval;
