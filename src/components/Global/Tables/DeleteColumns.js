import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from "react-redux";
import { getMaterial } from "../../Store/Features/Material/materialSlice";
import { getStorage } from "../../Store/Features/Material/storageSlice";
import { getRemoval } from "../../Store/Features/Material/removalSlice";
import { getProduct } from "../../Store/Features/Products/productSlice";
import { getTransaction } from "../../Store/Features/Products/transactionSlice";

export default function DeleteColumns(props) {

    const dispatch = useDispatch();

  const itemDelete = (id, type, e) => {
    e.preventDefault();
    
    if (props.typeTable === "item")
    {Axios.delete(`/api/item_delete/${id}`)
    .then(() => {
      console.log("Item Deleted!");
      dispatch(getMaterial());
      navigate("/material");
    })
    .catch((err) => console.log(err));
  } 
  else if (props.typeTable === "storage")
  {Axios.delete(`/api/storage_delete/${id}`)
    .then(() => {
      console.log("Storage Deleted!");
      dispatch(getStorage());
      navigate("/stock");
    })
    .catch((err) => console.log(err))}
  else if (props.typeTable === "removal") {
    Axios.delete(`/api/removal_delete/${id}`)
      .then(() => {
        console.log("Removal Deleted!");
        dispatch(getRemoval());
        navigate("/stock");
      })
      .catch((err) => console.log(err));
  } else if (props.typeTable === "product") {
    Axios.delete(`/api/product_delete/${id}`)
      .then(() => {
        console.log("Product Deleted!");
        dispatch(getProduct());
        navigate("/product");
      })
      .catch((err) => console.log(err));
  } else if (props.typeTable === "transaction") {
    Axios.delete(`/api/transaction_delete/${id}`)
      .then(() => {
        console.log("Transaction Deleted!");
        dispatch(getTransaction());
        navigate("/transaction");
      })
      .catch((err) => console.log(err));
  } else {
    console.log("nepodporovaný typ tabulky");
  }
};

        const navigate = useNavigate();

  return (
    <div>
      <Button
        type="delete"
        id={props.typeTable}
        //size="small"
        variant="contained"
        color="error"
        sx={{mt:1}}
        startIcon={<DeleteOutlinedIcon />}
        disabled={props.disabledRow}
        onClick={(e) =>
          props.selectedRows.map(
            (row) =>
              //console.log(row.original.id),
              itemDelete(row.original.id, props.typeTable, e)
            //postDelete(row.original.id, e)
            //navigate("/")
          )
        }
      >
        Vymazat
      </Button>
    </div>
  );
}
