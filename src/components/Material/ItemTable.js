import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from "react-table";
import { useNavigate } from "react-router-dom";
import { ITEM_COLUMNS } from "./ItemColumns";
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from "./ColumnFilter";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsSortDown,
} from "react-icons/bs";
import Axios from "axios";
import { CheckboxTable } from "../Global/Checkbox";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import {
  Container,
  Box,
  Stack,
  Divider,
  Button,
  ButtonGroup,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  tableCellClasses,
  styled,
  Grid,
} from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";


function ItemTable() {

const [material, setMaterial] = useState([]);
useEffect(() => {
  Axios.get("/api/list_items/")
  .then((res) => {
    setMaterial(res.data);
    console.log("tabulka s daty: ", res.data);
  });
  
}, []);

  const navigate = useNavigate();

    const postDelete = (id, e) => {
      e.preventDefault();
      Axios.delete(`/api/item_delete/${id}`)
      .then(res => {
        console.log("Deleted!", res);
        //setMaterial();
        navigate("/material");
      }).catch(err => console.log(err))
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
              <CheckboxTable
                size="small"
                {...getToggleAllRowsSelectedProps()}
              />
            ),
            Cell: ({ row }) => (
              <CheckboxTable
                size="small"
                {...row.getToggleRowSelectedProps()}
              />
            ),
          },
          ...columns,
        ]);
      }
    );

    const { globalFilter, pageIndex, pageSize } = state;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: 6,

      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          sx={
            {
              //border: "1px solid",
              //backgroundColor: "primary.light",
            }
          }
        >
          <Grid
            container
            //spacing={{ xs: 0, md: 0 }}
            // sx={{
            //   border: "1px solid",
            //   backgroundColor: "primary.light"
            // }}
          >
            <Grid
              container
              item
              xs={6}
              justifyContent={"start"}
              alignContent={"center"}
            >
              <FormLabel>Vyberte sloupce k zobrazení</FormLabel>
            </Grid>
            <Grid
              container
              item
              xs={6}
              justifyContent={"end"}
              alignContent={"center"}
            >
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <FormControlLabel
                label=<strong>{"Zobraz vše"}</strong>
                control={
                  <CheckboxTable
                    size="small"
                    {...getToggleHideAllColumnsProps()}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            // spacing={{ xs: 1, md: 2 }}
          >
            {allColumns.map((column) => (
              <Grid item xs={6} sm={3} md={2} key={column.id}>
                {/* <div key={column.id}> */}
                <FormControlLabel
                  // value="bottom"
                  // labelPlacement="bottom"
                  label={column.Header}
                  control={
                    <CheckboxTable
                      size="small"
                      {...column.getToggleHiddenProps()}
                    />
                  }
                  //label="bottom"
                />
                {/* </div> */}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: "700px" }}>
        <Table
          {...getTableProps()}
          //aria-label="customized table"
          size="small"
          stickyHeader
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    sx={{
                      backgroundColor: "primary.main",
                    }}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")} {/* název sloupce */}
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
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <StyledTableRow {...row.getRowProps()} hover>
                  {row.cells.map((cell) => {
                    return (
                      <StyledTableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
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
        </Table>
      </TableContainer>

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
            {" << "}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {" "}
            >>{" "}
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
            selectedFlatRows.map(
              (row) => postDelete(row.original.id, e),
              navigate("/")
            )
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
