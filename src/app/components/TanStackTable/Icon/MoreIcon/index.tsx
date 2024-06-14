import {IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

type Props = {
  size?: 'small' | 'medium' | 'large';
}

export function MoreIcon({size = 'small'} : Props) {
  const styles = {
    visibility: 'hidden',
  }

  return (
    <IconButton aria-label="show filters" size={size} sx={{...styles}}>
      <MoreVertIcon fontSize="inherit" />
    </IconButton>
  )
}
