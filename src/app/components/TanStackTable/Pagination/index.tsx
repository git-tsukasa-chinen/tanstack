import { Table, PaginationState } from "@tanstack/react-table";
import { Stack, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, List as ListIcon } from "@mui/icons-material";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

type Props<T> = {
  table: Table<T>;
  pagination: PaginationState
  pageSizes: number[];
}

export function Pagination<T>({table, pagination, pageSizes}: Props<T>) {

  const total = table.getRowCount();
  const from = pagination.pageIndex * pagination.pageSize + 1;
  const to = (pagination.pageIndex + 1) * pagination.pageSize < total ? (pagination.pageIndex + 1) * pagination.pageSize : total;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ py:2, px:1 }}
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
            {pageSizes.map((size) => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
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
  )
}