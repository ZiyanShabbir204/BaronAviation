import { DataGrid } from "@mui/x-data-grid";
// import { useEffect, Children } from "react";
// import MenuWithParams from "./MenuWithParams";

export default function Datagrid({ rows, columns, loading }) {
  // TODO
  //   const Menu = Children.toArray(children).find(
  //     (child) => child.type === Datagrid.Menu
  //   );
  //   useEffect(() => {
  //     console.log("above menu");

  //     if (Menu) {
  //       console.log("in menu");
  //       const MenuHOC = MenuWithParams(Menu);
  //       columns.push({
  //         field: "actions",
  //         type: "actions",
  //         width: 100,
  //         renderCell: (param) => {
  //           return <Menu />;
  //         },
  //       });

  //       columns = [...columns];
  //     }
  //   }, []);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <DataGrid
        rows={rows}
        disableMultipleSelection
        columns={columns}
        loading={loading}
        pageSizeOptions={5}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </div>
  );
}

// TODO
// Datagrid.Menu = ({ children }) => {
//   return <div className="grid-menu">{children}</div>;
// };
