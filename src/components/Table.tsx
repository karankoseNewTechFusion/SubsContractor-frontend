import React from "react";
import "./Table.css";

export type TableColumn<T> = {
  key: keyof T | string;
  title: string;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T, rowIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
  rowKey?: (row: T, rowIndex: number) => string | number;
};

function Table<T extends object>({
  columns,
  data,
  onRowClick,
  className = "",
  style = {},
  rowKey,
}: TableProps<T>) {
  return (
    <div className={`custom-table-wrapper ${className}`} style={style}>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key as string}
                style={{ width: col.width, textAlign: col.align || "left" }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowKey ? rowKey(row, rowIndex) : rowIndex}
              className={onRowClick ? "clickable-row" : undefined}
              onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={col.key as string}
                  style={{ textAlign: col.align || "left" }}
                >
                  {col.render
                    ? col.render((row as any)[col.key], row, rowIndex)
                    : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table; 