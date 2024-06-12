"use client";
import { useState, useEffect } from "react";
import { Table, TableContainer, Stack, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
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
  enableStripedRow?: boolean; // ストライプテーブル
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
  sortDescFirst = false,
  enableStripedRow = true,
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

  /** Pagination */
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3, // Show 3 rows per page
  });

  /** Init Table */
  const table = useReactTable({
    data,
    columns,
    enableMultiRowSelection: enableMultiRowSelection,
    enableRowSelection: enableRowSelection !== undefined ? (row) => enableRowSelection(row.original) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    enableMultiSort: enableMultiSort,
    onSortingChange: enableSorting ? setSorting : undefined,
    sortDescFirst: sortDescFirst,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // manualSorting: true, // Server-side sorting
    state: {
      columnVisibility,
      pagination,
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

  const total = table.getRowCount();
  const from = pagination.pageIndex * pagination.pageSize + 1;
  const to = (pagination.pageIndex + 1) * pagination.pageSize < total ? (pagination.pageIndex + 1) * pagination.pageSize : total;

  // useEffect(() => {
  //   console.log(selectedRows);
  // }, [selectedRows]);

  // useEffect(() => {
  //   const sortedRows = table.getSortedRowModel().rows.map((row) => row.original);
  //   console.log('Sorting:', sorting);
  //   console.table(sorting);
  //   console.log('Sorted Rows:');
  //   console.table(sortedRows);
  // }, [sorting, table]);

  return (
    <div>
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
            enableStripedRow={enableStripedRow}
          />
        </Table>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: 32, width: "100%", pr: 6 }}
        >
          <Typography>{from}件目から{to}件目を表示 (全{total}件)</Typography>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography id="page-size" variant="subtitle2">表示数</Typography>
              <Select
                inputProps={{ tabIndex: -1 }}
                labelId="page-size"
                variant="standard"
                disableUnderline
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </Stack>
            <IconButton
              aria-label="最初のページ"
              tabIndex={-1}
              size="small"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.firstPage()}
            >
              <KeyboardDoubleArrowLeftIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="前ページ"
              tabIndex={-1}
              size="small"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="次ページ"
              tabIndex={-1}
              size="small"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="最後のページ"
              tabIndex={-1}
              size="small"
              disabled={!table.getCanNextPage()}
              onClick={() => table.lastPage()}
            >
              <KeyboardDoubleArrowRightIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Stack>
      </TableContainer>
    </div>
  );
}

export default TanStackTable