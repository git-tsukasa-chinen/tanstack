"use client";
import TanStackTable from "./components/TanStackTable"
import {columns, rows} from './components/TanStackTable/Data'

export default function Home() {
  return (
    <main>
      <TanStackTable
        data={rows}
        columns={columns}
        checkboxSelection={true}
        enableMultiRowSelection={true}
        enableRowSelection={() => true}
        enableRowSelectionOnClick={true}
        enableSorting={true}
        enableMultiSort={true}
      />
    </main>
  )
}