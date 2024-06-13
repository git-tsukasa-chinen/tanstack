"use client";
import { useState, useEffect } from "react";
import { Box, Chip, List, ListItem, ListItemText, Popover, Switch, Table, TableContainer, Stack } from "@mui/material";
import { ColumnDef, ColumnFilter, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { bindPopover, bindTrigger, usePopupState } from "material-ui-popup-state/hooks";

import { TableController } from "./TableController";
import { TableHeader } from "./TableHeader";
import { TableContents } from "./TableContents";
import { Pagination } from "./Pagination";

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
  pageSizes: number[]; // 表示数の選択肢
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
  pageSizes = [10, 30, 50, 100]
}: Props<T>) {

  const popupState = usePopupState({
    variant: "popover",
    popupId: 'popup-filtering',
  });

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
    pageSize: pageSizes[0],
  });

  /** Column Filtering */
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])

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
    // onColumnFiltersChange: setColumnFilters,
    // enableColumnFilters: true,
    // manualSorting: true, // Server-side sorting
    state: {
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
      columnFilters
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

  return (
    <div>
      <TableContainer>
        <TableController table={table} />
        <Chip
          size="small"
          label={
            <Stack spacing={1} direction="row" alignItems="center">
              <Box>絞り込み</Box>
            </Stack>
          }
          {...bindTrigger(popupState)}
        />
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2, width: 200 }}>
            <List>
              <Box>
                <ListItem>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%" }}>
                      <ListItemText sx={{ flexGrow: 1 }}>男性のみ</ListItemText>
                    </Stack>
                </ListItem>
              </Box>
            </List>
          </Box>
        </Popover>

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
        <Pagination
          table={table}
          pagination={pagination}
          pageSizes={pageSizes}
        />
      </TableContainer>
    </div>
  );
}

export default TanStackTable