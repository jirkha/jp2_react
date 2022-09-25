import { Link } from "react-router-dom";
import { format } from 'date-fns'
import { ColumnFilter } from './ColumnFilter'


export const ITEM_COLUMNS = [
  {
    Header: "ID ",
    Footer: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Název ",
    Footer: "Název",
    accessor: "name",
    Cell: ({ row }) => (
      <Link to={`/material/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    Header: "Typ ",
    Footer: "Typ",
    accessor: "type.name",
  },
  {
    Header: "Cena ",
    Footer: "Cena",
    accessor: "costs",
  },
  {
    Header: "Dodavatel ",
    Footer: "Dodavatel",
    accessor: "supplier",
  },
  {
    Header: "Odkaz ",
    Footer: "Odkaz",
    accessor: "link",
    Cell: ({ row }) => <a href={row.original.link}>{row.original.link}</a>,
  },
  // {
  //   Header: "Poznámka ",
  //   Footer: "Poznámka",
  //   accessor: "note",
  //   Filter: ColumnFilter,
  // },
  {
    Header: "Vytvořeno ",
    Footer: "Vytvořeno",
    accessor: "created",
    Cell: ({ value }) => {
      return format(new Date(value), "dd.MM.yyyy");
    },
  },
  {
    Header: "Upraveno ",
    Footer: "Upraveno",
    accessor: "updated",
    Cell: ({ value }) => {
      return format(new Date(value), "dd.MM.yyyy HH:mm:ss");
    },
  },
];
