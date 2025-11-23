const TableBody = ({ data, columns }) => {
  return (
    <tbody className="divide-y divide-gray-300">
      {data.map((item, index) => (
        <tr key={index} className="hover:bg-gray-50">
          {columns.map((column) => (
            <td key={index + column.key} className="p-4">
              {column.render ? column.render(item) : item[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
