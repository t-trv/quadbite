const TableSearch = ({ search, setSearch }) => {
  return (
    <div className="inline-block">
      <div className="flex justify-end items-center gap-2">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, số,..."
          className="px-4 py-1 rounded-lg border border-gray-300 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default TableSearch;
