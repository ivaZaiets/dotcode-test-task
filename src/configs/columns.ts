import { GridColDef } from "@mui/x-data-grid";
import { Row } from "../interfaces/Row";

export const columns: GridColDef<Row>[] = [
  {
    field: "from",
    headerName: "From",
    flex: 1,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "to",
    headerName: "To",
    flex: 1,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "sum",
    headerName: "Sum",
    flex: 0.5,
    resizable: false,
    disableColumnMenu: true,
  },
];
