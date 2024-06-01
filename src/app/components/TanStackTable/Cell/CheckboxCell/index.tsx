import { TableCell, Checkbox } from "@mui/material";

type Props = {
  checked: boolean;
  indeterminate?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckboxCell = ({ checked, indeterminate, onChange }: Props) => {
  return (
    <TableCell padding="checkbox">
      <Checkbox checked={checked} onChange={onChange} indeterminate={indeterminate} />
    </TableCell>
  );
};
