import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { ITEM_COLUMNS } from "../components/Material/ItemColumns";
import { GlobalFilter } from "../components/Material/GlobalFilter";
import { ColumnFilter } from "../components/Material/ColumnFilter";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsSortDown,
} from "react-icons/bs";
import Axios from "axios";
import { useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { Styles } from "../components/Material/TableStyles";
import "../components/Material/table.css";
import { CheckboxTable } from "../components/Global/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";


//import { Button } from "../../styles/styles.js";


function ItemTable() {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    Axios.get("/api/list_items/").then((res) => {
      setMaterial(res.data);
      console.log("tabulka s daty: ", res.data);
    });
  }, []);

  const postDelete = (id, e) => {
    e.preventDefault();
    Axios.delete(`/api/item_delete/${id}`)
      .then((res) => console.log("Deleted!", res))
      .catch((err) => console.log(err));
  };

  const columns = useMemo(() => ITEM_COLUMNS, []);
  const data = useMemo(() => material);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    setPageSize,
    state,
    setGlobalFilter,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <CheckboxTable {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <CheckboxTable {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div>
        {/* <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup> */}
        <div>
          <CheckboxTable {...getToggleHideAllColumnsProps()} /> Zobraz vše
        </div>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.Header}
            </label>
          </div>
        ))}
        <br />
      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsFillArrowDownSquareFill />
                      ) : (
                        <BsFillArrowUpSquareFill />
                      )
                    ) : (
                      <BsSortDown />
                    )}
                  </span>

                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* tfoot slouží k zobrazení legendy tabulky po tabulkou - je deaktivováno */}
        {/* <tfoot>
        {footerGroups.map((footerGroop) => (
          <tr {...footerGroop.getFooterGroupProps()}>
            {footerGroop.headers.map((column) => (
              <td {...column.getFooterProps}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot> */}
      </table>
      <div>
        <span>
          Strana{" "}
          <strong>
            {pageIndex + 1} z {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Stran {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {" "}
          -1{" "}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {" "}
          +1{" "}
        </button>
      </div>
      {/* <Button type="delete" onClick={(e) => postDelete(material?.m_ser.id, e)}> */}
      <button
        type="delete"
        color={"red"}
        disabled={selectedFlatRows.length < 1}
        onClick={(e) =>
          selectedFlatRows.map((row) => postDelete(row.original.id, e))
        }
      >
        Vymazat
      </button>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
}

export default ItemTable;
