import {IconButton } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

type Props = {
  isFiltered: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function FilterIcon({isFiltered = false, size = 'small'} : Props) {

  const styles = {
    ml: 0.5,
    visibility: isFiltered ? 'visible' : 'hidden',
    opacity: isFiltered ? 1 : 0.5
  }

  return (
    <IconButton aria-label="show filters" size={size} sx={{...styles}}>
      <FilterAltIcon fontSize="inherit" />
    </IconButton>
  )
}
