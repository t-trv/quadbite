function genPage(page, totalPages) {
  const pages = [];

  if (totalPages <= 5) {
    // Nếu ít hơn hoặc bằng 5 trang thì show hết
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  // Nếu ở đầu
  if (page <= 3) {
    pages.push(1, 2, 3, "...", totalPages);
  }
  // Nếu ở cuối
  else if (page >= totalPages - 2) {
    pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
  }
  // Ở giữa
  else {
    pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
  }

  return pages;
}

export default genPage;
