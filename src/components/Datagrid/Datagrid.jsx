import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DatagridToolbar from "../DatagridToolbar";
import "./datagrid.css";

export default function Datagrid({ rows, columns, loading, sortModel = [] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 200px)",
        minHeight: "400px",
      }}
    >
      <DataGrid
        rows={rows}
        disableMultipleSelection
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        getRowClassName={(params) => {
          const dynamicRows =
            params.indexRelativeToCurrentPage % 2 === 0
              ? "row-even"
              : "row-odd";
          return `mui-datagrid-rows ${dynamicRows}`;
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
          sorting: {
            sortModel,
          },
        }}
        slots={{ toolbar: DatagridToolbar }}
        rowSelection={false}
      />
    </div>
  );
}
