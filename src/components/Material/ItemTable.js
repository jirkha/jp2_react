import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from "react-table";
import { ITEM_COLUMNS } from "./ItemColumns";
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from "./ColumnFilter";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsSortDown,
} from "react-icons/bs";
import Axios from "axios";
import './table.css';
import { CheckboxTable } from "../Global/Checkbox";

import Container from "@mui/material/Container";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";


function ItemTable() {

const [material, setMaterial] = useState([]);
useEffect(() => {
  Axios.get("/api/list_items/")
  .then((res) => {
    setMaterial(res.data);
    console.log("tabulka s daty: ", res.data);
  });
  
}, []);

    const postDelete = (id, e) => {
      e.preventDefault();
      Axios.delete(`/api/item_delete/${id}`)
      .then(res => console.log("Deleted!", res)
    ).catch(err => console.log(err))
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
      getToggleHideAllColumnsProps
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

      <Stack
        direction="row"
        alignItems="flex-end"
        spacing={4}
        justifyContent="space-between"
      >
        <ButtonGroup
          variant="contained"
          size="small"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {" "}
            -{" "}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {" "}
            +{" "}
          </Button>
        </ButtonGroup>
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
        </div>
        <Button
          type="delete"
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlinedIcon />}
          disabled={selectedFlatRows.length < 1}
          onClick={(e) =>
            selectedFlatRows.map((row) => postDelete(row.original.id, e))
          }
        >
          Vymazat materiál
        </Button>
      </Stack>
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
