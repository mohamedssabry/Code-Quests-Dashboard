import React from "react";

type TableProps<T extends Record<string, unknown>> = {
  columns: string[];
  data: T[];
};

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 font-medium text-gray-700">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-4 py-2 text-sm">
                    {typeof val === "string" || typeof val === "number"
                      ? val
                      : React.isValidElement(val)
                      ? val
                      : JSON.stringify(val)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
