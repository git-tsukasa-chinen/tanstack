import { Table, flexRender, SortingState } from '@tanstack/react-table';
import { Box, TableHead, TableCell } from "@mui/material";

import { Row } from "../Row";
import { CheckboxCell } from "../Cell/CheckboxCell";
import { SortIcon, FilterIcon, MoreIcon } from '../Icon';

type Props<T> = {
  table: Table<T>;
  height?: number;
  checkboxSelection?: boolean;
  enableSorting?: boolean;
  sorting: SortingState
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
                sx={{
                  '&:hover .MuiIconButton-root': {
                    visibility: 'visible',
                  },
                }}
              >
                {header.isPlaceholder ? null : (
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      {flexRender(header.column.columnDef.header,header.getContext())}
                      {enableSorting && header.column.getCanSort() && (
                        <SortIcon
                          column={header.column}
                          sorting={sorting}
                          isSorted={header.column.getIsSorted()}
                        />
                      )}
                      <FilterIcon isFiltered={false} />
                    </Box>
                    <Box sx={{mr: '-10px'}}>
                      <MoreIcon />
                    </Box>
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