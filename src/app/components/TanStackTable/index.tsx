"use client";
import { useState, useEffect } from "react";
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Table, TableContainer, Typography, Box } from "@mui/material";

import { TableController } from "./TableController";
import { TableHeader } from "./TableHeader";
import { TableContents } from "./TableContents";

type customColumnDef<T> = ColumnDef<T> & {
  id?: never;
  accessorKey: string;
  header: string | undefined;
  visibility?: boolean;
};

type Props<T> = {
  data: T[];
  columns: customColumnDef<T>[];
  columnHeight?: number;
  rowHeight?: number;
  checkboxSelection?: boolean; // チェックボックの表示
  enableMultiRowSelection?: boolean; // 複数選択の有効化
  enableRowSelection?: (row: T) => boolean; // 選択できる行の条件
  enableRowSelectionOnClick?: boolean; // 行全体をクリックして選択
  enableSorting?: boolean; // ソートの有効化
  enableMultiSort?: boolean; // 複数ソートの有効化
  sortDescFirst?: boolean; // ソート時の初期値を降順にするか
};

function TanStackTable<T>({
  data,
  columns,
  columnHeight,
  rowHeight,
  checkboxSelection,
  enableMultiRowSelection,
  enableRowSelection,
  enableRowSelectionOnClick,
  enableSorting = true,
  enableMultiSort = true,
  sortDescFirst = false
}: Props<T>) {

  /** Column Visibility */
  const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>(() => {
    // default value is "true", but if "visibility" seted use the its value.
    return columns.reduce((acc, column) => {
      if (column.accessorKey) {
        acc[column.accessorKey] = column.visibility ?? true;
      }
      return acc;
    }, {} as { [key: string]: boolean });
  });

  /** Row Selection */
  const [rowSelection, setRowSelection] = useState<{[key: number]: boolean}>({}) //manage your own row selection state

  /** Sorting */
  const [sorting, setSorting] = useState<SortingState>([])

  /** Init Table */
  const table = useReactTable({
    data,
    columns,
    enableMultiRowSelection: enableMultiRowSelection,
    enableRowSelection: enableRowSelection !== undefined ? (row) => enableRowSelection(row.original) : undefined,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    enableMultiSort: enableMultiSort,
    onSortingChange: enableSorting ? setSorting : undefined,
    sortDescFirst: sortDescFirst,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // manualSorting: true, // Server-side sorting
    state: {
      columnVisibility,
      rowSelection,
      sorting
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  /** Selected Row */
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  useEffect(() => {
    const _selectedRowData = table.getSelectedRowModel().rows.map((row) => row.original);
    setSelectedRows(_selectedRowData);
  }, [rowSelection, table]);

  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows]);

  useEffect(() => {
    const sortedRows = table.getSortedRowModel().rows.map((row) => row.original);
    console.log('Sorting:', sorting);
    console.table(sorting);
    console.log('Sorted Rows:');
    console.table(sortedRows);
  }, [sorting, table]);

  return (
    <div>
      <Box sx={{backgroundColor: '#e2f2ff'}} padding={1} borderRadius={1} mb={4}>
        <Typography variant="subtitle1">TanStack Table</Typography>
      </Box>
      <TableContainer>
        <TableController table={table} />
        <Table>
          <TableHeader
            table={table}
            height={columnHeight}
            checkboxSelection={checkboxSelection}
            enableSorting={enableSorting}
            sorting={sorting}
          />
          <TableContents
            rowModel={table.getRowModel()}
            height={rowHeight}
            checkboxSelection={checkboxSelection}
            enableRowSelectionOnClick={enableRowSelectionOnClick}
          />
        </Table>
        <p>Rows Number: {table.getRowModel().rows.length}</p>
      </TableContainer>
    </div>
  );
}

export default TanStackTable