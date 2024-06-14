
import { Column, SortingState, SortDirection } from "@tanstack/react-table";
import { Badge, IconButton } from "@mui/material";
import { ArrowUpward, ArrowDownward,  } from '@mui/icons-material';

type Props<T> = {
  column: Column<T>,
  sorting: SortingState,
  isSorted?: false | SortDirection;
  size?: 'small' | 'medium' | 'large';
}

export function SortIcon<T>({column, sorting, isSorted = false, size = 'small'}: Props<T>) {

  const styles = {
    ml: 0.5,
    visibility: isSorted ? 'visible' : 'hidden',
    opacity: isSorted ? 1 : 0.5
  }

  return (
    <IconButton aria-label="sort" onClick={column.getToggleSortingHandler()} size={size} sx={{...styles}}>
      <Badge
        color="default"
        badgeContent={ sorting.length > 1 ? sorting.findIndex((s) => s.id === column.id ) + 1 : 0 }
      >
        {column.getIsSorted() === 'desc' ? <ArrowDownward fontSize="inherit" /> : <ArrowUpward fontSize="inherit" /> }
      </Badge>
    </IconButton>
  );
}

