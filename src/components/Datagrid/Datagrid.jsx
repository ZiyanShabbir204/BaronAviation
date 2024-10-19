import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DatagridToolbar from "../DatagridToolbar";


export default function Datagrid({ rows, columns, loading }) {
 
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <DataGrid
        rows={rows}
        disableMultipleSelection
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        slots={{ toolbar: DatagridToolbar }}
        rowSelection={false}
      />
    </div>
  );
}

