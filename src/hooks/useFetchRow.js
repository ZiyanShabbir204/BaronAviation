import { useState, useEffect, useCallback } from "react";
import ApiService from "../api.service";
export default function useFetchRow(endpoint) {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);

  const fetchRows = useCallback(async () => {
    setRowsLoading(true);
    try {
      const data = await ApiService.get(endpoint);
      setRows(
        data.map((d) => ({
          ...d,
          id: d._id,
        }))
      );
    } catch (err) {
      console.log("err in useFetchRow -> fetchRows", err);
    } finally {
      setRowsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRows();
  }, []);

  return {
    fetchRows,
    rows,
    rowsLoading,
  };
}
