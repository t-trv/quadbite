const TableBody = ({ data, columns }) => {
  return (
    <tbody className="divide-y divide-gray-300">
      {data.map((item) => (
        <tr key={item.id} className="hover:bg-gray-50">
          {columns.map((column) => (
            <td key={column.key} className="p-4">
              {column.render ? column.render(item) : item[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
