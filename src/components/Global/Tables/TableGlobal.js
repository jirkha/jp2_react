import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from "react-table";
import { useNavigate } from "react-router-dom";
import { GlobalFilter } from "../../Material/GlobalFilter";
import { ColumnFilter } from "../../Material/ColumnFilter";
import DeleteColumns from "./DeleteColumns";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsSortDown,
} from "react-icons/bs";
import { CheckboxTable } from "../Checkbox";
import Axios from "axios";

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
  Typography,
  Paper,
  tableCellClasses,
  styled,
  Grid,
} from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";


function TableGlobal(props) {
  
  // const [material, setMaterial] = useState([]);

  // useEffect(() => {
  //   getMaterial();
  // }, []);

  // const getMaterial = () => {
  //   Axios.get("/api/list_items/").then((res) => {
  //     setMaterial(res.data);
  //     console.log("Data načtena");
  //     console.log("res.data", res.data);
  //   });
  // };
  

  // const navigate = useNavigate();

  // const postDelete = (id, e, typeTab) => {
  //   e.preventDefault();
  //   if (typeTab === "item") {
  //     Axios.delete(`/api/item_delete/${id}`)
  //     .then(() => {
  //       console.log("Deleted!");
  //       getMaterial();
  //       navigate("/material");
  //     })
  //     .catch((err) => console.log(err));}
  //     else {
  //       console.log("neznámý typ tabulky")
  //     }
  
    
  // };

  const columns = useMemo(() => props.columns, []);
  const data = useMemo(() => props.dataAPI);

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
            <CheckboxTable size="small" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <CheckboxTable size="small" {...row.getToggleRowSelectedProps()} />
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
              <Grid item xs={6} sm={3} md={3} 
              key={column.id}>
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

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "700px", borderRadius: "15px" }}
      >
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
            {(page.length > 0 &&
              page.map((row) => {
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
              })) || (
              <StyledTableRow>
                <Typography sx={{ flexWrap: "false" }}>
                  Žádná položka k zobrazení
                </Typography>
              </StyledTableRow>
            )}
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
        alignItems="center"
        spacing={4}
        justifyContent="space-between"
      >
        <ButtonGroup
          variant="contained"
          //size="small"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {" << "}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {" "}
            {" >> "}
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
        <DeleteColumns
          disabledRow={selectedFlatRows.length < 1}
          typeTable={props.type}
          //rows={row.original.id}
          //key={e}
          selectedRows={selectedFlatRows}
        />
        {/* <Button
          type="delete"
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlinedIcon />}
          disabled={selectedFlatRows.length < 1}
          onClick={(e) =>
            selectedFlatRows.map(
              (row) => (
                console.log(row.original.id),
                postDelete(row.original.id, e, props.type)
              )
              //postDelete(row.original.id, e)
              //navigate("/")
            )
          }
        >
          Vymazat
        </Button> */}
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

export default TableGlobal;
