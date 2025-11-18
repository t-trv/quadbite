import apiRequest from "../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

export const useTableData = (endpoint, options = {}) => {
  const { initialPage = 1, limit = 10, initialSearch = "", enabled = true } = options;

  // Query dữ liệu một lần (xử lý phân trang ở fe) -> lấy ra rawData
  const {
    data: rawData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await apiRequest.get(endpoint);
      return res.data.data || [];
    },
    enabled,
    staleTime: 1000 * 60 * 60, // 1h cache
  });

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (column) => {
    setPage(1); // Reset page khi sort thay đổi
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return rawData;

    return [...rawData].sort((a, b) => {
      let valueA = a[sortColumn];
      let valueB = b[sortColumn];

      // Handle null/undefined - đưa null về cuối
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // Detect datetime string (format ISO: "2025-11-05T15:44:17.000Z")
      const isDateA = typeof valueA === "string" && /^\d{4}-\d{2}-\d{2}T/.test(valueA) && !isNaN(Date.parse(valueA));
      const isDateB = typeof valueB === "string" && /^\d{4}-\d{2}-\d{2}T/.test(valueB) && !isNaN(Date.parse(valueB));

      if (isDateA || isDateB) {
        // Convert datetime string to timestamp để so sánh
        const timestampA = isDateA ? new Date(valueA).getTime() : valueA;
        const timestampB = isDateB ? new Date(valueB).getTime() : valueB;

        if (sortDirection === "asc") {
          return timestampA - timestampB;
        } else {
          return timestampB - timestampA;
        }
      }

      // Handle number
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Handle string comparison
      const strA = String(valueA).toLowerCase();
      const strB = String(valueB).toLowerCase();
      if (sortDirection === "asc") {
        return strA.localeCompare(strB);
      } else {
        return strB.localeCompare(strA);
      }
    });
  }, [rawData, sortColumn, sortDirection]);

  // Lọc theo từ khóa (nếu có) - filter tu sortedData
  const filtered = useMemo(() => {
    if (!search) return sortedData;
    return sortedData.filter((item) => Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase()));
  }, [sortedData, search]);

  // Tính toán phân trang
  const totalPages = Math.ceil(filtered.length / limit) || 1;
  const data = filtered.slice((page - 1) * limit, page * limit);

  return {
    data,
    isLoading,
    isError,
    error,

    page,
    setPage,
    totalPages,

    search,
    setSearch,

    handleSort,
    sortColumn,
    sortDirection,
  };
};
