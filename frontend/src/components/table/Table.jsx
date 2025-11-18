import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";

const Table = ({ columns, data, onSort, sortColumn, sortDirection }) => {
  if (!data || data.length === 0) return <div className="text-secondary">Không có dữ liệu</div>;

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-gray-300 shadow-sm w-full">
        <div className="max-h-135 h-fit overflow-y-auto hide-scrollbar">
          <table className="w-full border-collapse">
            {/* Header */}
            <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} sortDirection={sortDirection} />

            {/* Body */}
            <TableBody columns={columns} data={data} />
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
