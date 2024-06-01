import { Table, flexRender, SortingState } from '@tanstack/react-table';
import { Box, Badge, IconButton, TableHead, TableCell } from "@mui/material";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Row } from "../Row";
import { CheckboxCell } from "../Cell/CheckboxCell";

type Props<T> = {
  table: Table<T>;
  height?: number;
  checkboxSelection?: boolean;
  enableSorting?: boolean;
  sorting: SortingState
}

function sortIndex( sorting: SortingState, columnId: string ) : number {
  return sorting.findIndex( s => s.id === columnId ) + 1;
}

export function TableHeader<T>({
  table,
  height,
  checkboxSelection = true,
  enableSorting = true,
  sorting
} : Props<T>) {

  return (
    <TableHead>
      {
        table.getHeaderGroups().map((headerGroup) => (
          <Row key={headerGroup.id} height={height}>
            {checkboxSelection && (
              <CheckboxCell
                checked={table.getIsAllRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
              />
            )}
            {headerGroup.headers.map((header) => (
              <TableCell
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                sx={{
                  cursor: enableSorting ? 'pointer' : 'default',
                  '.MuiIconButton-root': {
                    ml: 0.5,
                    visibility: header.column.getIsSorted() ? 'visible' : 'hidden',
                  },
                  '&:hover .MuiIconButton-root': {
                    visibility: 'visible',
                  },
                  '.MuiSvgIcon-root': {
                    opacity: header.column.getIsSorted() ? 1 : 0.5,
                  }
                }}
              >
                {header.isPlaceholder ? null : (
                  <Box display="flex" alignItems="center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {enableSorting && header.column.getCanSort() &&　(
                      <IconButton size="small" aria-label="Sort">
                        <Badge color="default" badgeContent={ sorting.length > 1 ? sortIndex( sorting, header.column.id ) : 0 }>
                          {header.column.getIsSorted() === 'desc' ? <ArrowDownward fontSize="inherit" /> : <ArrowUpward fontSize="inherit" /> }
                        </Badge>
                      </IconButton>
                    )}
                  </Box>
                )}
              </TableCell>
            ))}
          </Row>
        ))
      }
    </TableHead>
  )
}