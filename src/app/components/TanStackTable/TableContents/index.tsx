import { RowModel, flexRender } from '@tanstack/react-table';
import { TableBody, TableCell } from "@mui/material";
import { Row } from "../Row";
import { CheckboxCell } from "../Cell/CheckboxCell";

type Props<T> = {
  rowModel: RowModel<T>;
  height?: number;
  checkboxSelection?: boolean;
  enableRowSelectionOnClick?: boolean;
}

export function TableContents<T>({rowModel, height, checkboxSelection = true, enableRowSelectionOnClick = true }: Props<T>) {
  return (
      <TableBody>
        {
          rowModel.rows.map((row) => (
            <Row key={row.id} height={height} onClick={enableRowSelectionOnClick ? row.getToggleSelectedHandler() : undefined}>
              {checkboxSelection && (
                <CheckboxCell
                  checked={row.getIsSelected()}
                  onClick={(event) => event.stopPropagation()}
                  onChange={row.getToggleSelectedHandler()}
                />
              )}
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </Row>
          ))
        }
    </TableBody>

  )

}