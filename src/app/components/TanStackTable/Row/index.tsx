import { TableRow } from '@mui/material';

type Props = {
  children: React.ReactNode;
  height?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function Row ({ children, height, onClick }: Props) {
  const _min = 24;
  const _styles = {
    height: height === undefined ? 56 : height < _min ? _min : height,
  };

  return (
    <TableRow onClick={onClick} sx={{ ..._styles }}>
      {children}
    </TableRow>
  );
}