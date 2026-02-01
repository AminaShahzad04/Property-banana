import React from "react";

interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, idx: number) => React.ReactNode;
  className?: string;
  thClassName?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  trClassName?: string;
}

export function Table<T extends { [key: string]: any }>({
  columns,
  data,
  tableClassName = "w-full",
  theadClassName = "",
  tbodyClassName = "bg-white divide-y divide-gray-100",
  trClassName = "hover:bg-gray-50",
}: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg">
      <table className={tableClassName}>
        <thead
          style={{ backgroundColor: "#f1efef" }}
          className={theadClassName}
        >
          <tr>
            {columns.map((col, i) => (
              <th
                key={col.key as string}
                className={
                  "px-6 py-4 text-left text-sm font-semibold text-black " +
                  (i === 0 ? "rounded-tl-lg rounded-bl-lg " : "") +
                  (i === columns.length - 1
                    ? "rounded-tr-lg rounded-br-lg "
                    : "") +
                  (col.thClassName || "")
                }
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tbodyClassName}>
          {data.map((row, idx) => (
            <tr key={idx} className={trClassName}>
              {columns.map((col, i) => (
                <td
                  key={col.key as string}
                  className={col.className || "px-6 py-4 text-sm"}
                >
                  {col.render ? col.render(row, idx) : row[col.key as keyof T]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
