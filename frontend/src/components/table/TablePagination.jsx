import generatePages from "../../utils/genPages.js";

const TablePagination = ({ page, totalPages, setPage }) => {
  let pages = generatePages(page, totalPages);

  return (
    <div className="flex justify-center items-center gap-2">
      <p>
        {page} | {totalPages}
      </p>

      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page == 1}
        className={`bg-white text-secondary px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
          page == 1 ? "opacity-50" : "hover:bg-secondary hover:text-white"
        }`}
      >
        Trước
      </button>

      {pages.map((i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
            page == i
              ? "bg-secondary text-white"
              : "hover:bg-secondary hover:text-white"
          }`}
        >
          {i}
        </button>
      ))}

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page == totalPages}
        className={`bg-white text-secondary px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
          page == totalPages
            ? "opacity-50"
            : "hover:bg-secondary hover:text-white"
        }`}
      >
        Sau
      </button>
    </div>
  );
};

export default TablePagination;
