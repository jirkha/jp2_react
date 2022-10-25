import React, { useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { TRANSACTION_COLUMNS } from "./TransactionColumns";
import { useDispatch, useSelector } from "react-redux";
import {getTransaction} from "../Store/Features/Products/transactionSlice"


function TableTransaction() {

useEffect(() => {
  dispatch(getTransaction());
}, []);

const transaction = useSelector((state) => state.transaction.data);

console.log("transaction", transaction);

const dispatch = useDispatch();

  return (
    <div>
      {transaction && (
        <TableGlobal
          columns={TRANSACTION_COLUMNS}
          dataAPI={transaction}
          type="transaction"
        />
      )}
    </div>
  );
}

export default TableTransaction;
