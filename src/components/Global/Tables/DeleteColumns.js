import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function DeleteColumns(props) {

    const [material, setMaterial] = useState([]);

    useEffect(() => {
      getMaterial();
    }, [material]);

    const getMaterial = () => {
      Axios.get("/api/list_items/").then((res) => {
        setMaterial(res.data);
        // console.log("Data načtena");
        // console.log("res.data", res.data);
      });
    };

  const itemDelete = (id, type, e) => {
    e.preventDefault();
    
    if (props.typeTable === "item")
    {Axios.delete(`/api/item_delete/${id}`)
    .then(() => {
      console.log("Item Deleted!");
      getMaterial();
      navigate("/material");
    })
    .catch((err) => console.log(err));
  } 
  else if (props.typeTable === "storage")
  {Axios.delete(`/api/storage_delete/${id}`)
    .then(() => {
      console.log("Storage Deleted!");
      //getMaterial();
      navigate("/stock");
    })
    .catch((err) => console.log(err))}
  else if (props.typeTable === "removal")
  {Axios.delete(`/api/removal_delete/${id}`)
    .then(() => {
      console.log("Removal Deleted!");
      //getMaterial();
      navigate("/stock");
    })
    .catch((err) => console.log(err));}
  else {
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
