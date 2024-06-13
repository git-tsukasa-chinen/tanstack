import { Table as ReactTable } from '@tanstack/react-table';
import { ColumnVisibility } from "./ColumnVisibility"

type Props<T> = {
  table: ReactTable<T>;
}
export function TableController<T>({table}: Props<T>) {
  const allColumns = table.getAllColumns();
  return (
    <>
      <ColumnVisibility allColumns={allColumns} popupId="column-visibility" />
    </>
  )
}