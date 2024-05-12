"use client";
import { flexRender, getCoreRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table';

type tRow = {
  id: number,
  firstName: string,
  lastName: string,
  birth: string,
  gender?: string,
  description?: string
};

const TanstackTable = () => {

  const rows: tRow[] = [
    { id: 1, firstName: 'Taro', lastName: 'Yamada', birth: '1992年12月4日', description:'', gender: '男性' },
    { id: 2, firstName: '富士子', lastName: '鈴木', birth: '1993年3月9日', description:'', gender: '' },
    { id: 3, firstName: 'Daisuke', lastName: 'Saito', birth: 'February 18, 1994', description:"", gender: '' },
    { id: 4, firstName: 'John', lastName: 'Doo', birth: '1994年9月12日', description:"", gender: '' },
    { id: 5, firstName: '一郎', lastName: '田中', birth: '1995年10月13日', description: "田中一郎さんは日本でよく使われる名前です。実在してるかは分かりません" },
    { id: 6, firstName: 'Syun', lastName: 'Oguri', birth: '1995年12月30日', description:"",  gender: '女性'  },
    { id: 7, firstName: '潤', lastName: '松本', birth: 'September 1, 1997', description:"", gender: '' },
    { id: 8, firstName: 'Kazuya', lastName: 'Ninomiya', birth: '1983年6月17日', description:"", gender: '' }
  ];

  const columnHelper = createColumnHelper<tRow>();

  // 値は表示するデータ（オブジェクト）のkeyと合わせる
  const columns = [
    // columnHelper.display: ソートやフィルタはできないが、ボタンやチェックボックスなどを表示するのに使える
    // columnHelper.display({
    //   id: "edit",
    //   cell: (props) => (
    //     <button
    //       onClick={() => {
    //         console.info( '[ Show Clicked Row info ]\n', props.row,);
    //       }}
    //     >
    //       編集
    //     </button>
    //   ),
    // }),
    // columnHelper.group: ソートやフィルタができずに他のカラムのグループ化のために使われる。ヘッダーやフッターを定義するのに一般的に使われる
    columnHelper.group({
      id: "profile",
      header: () => <span>Profile</span>,
      columns: [
        columnHelper.display({
          id: "edit",
          header: "編集",
          cell: (props) => (
            <button
              onClick={() => {
                console.info('[ Show Clicked Row info ]\n', props.row);
              }}
            >
              edit row
            </button>
          ),
        }),
        columnHelper.accessor("id", {
          cell: (prop) => prop.getValue(),
        }),
        columnHelper.accessor("firstName", {
          header: "名",
          cell: (prop) => prop.getValue(),
        }),
        columnHelper.accessor((row) => row.lastName, {
          id: "lastName",
          header: () => <i>姓</i>,
          cell: (prop) => prop.getValue(),
        }),
      ],
    }),
    columnHelper.group({
      id: 'other',
      header: () => <span>Other</span>,
      columns: [
        columnHelper.accessor("birth", {
          header: () => <i>誕生日</i>,
          cell: (prop) => prop.getValue(),
        }),

        columnHelper.accessor("gender", {
          header: () => <i　style={{ whiteSpace: "nowrap"}}>性別</i>,
          cell: (prop) => prop.getValue(),
        }),

        columnHelper.display({
          id: "description",
          header: "概要",
          cell: (props) => (
            <span style={{ backgroundColor: "#eee" }}>
              {props.row.original.description}
            </span>
          ),
        }),
      ],
    }),
    // columnHelper.accessor('id', {
    //   header: 'ID',
    // }),
    // columnHelper.accessor('lastName', {
    //   header: '姓',
    // }),
    // columnHelper.accessor('firstName', {
    //   header: () => <i>名</i>,
    // }),
    // columnHelper.accessor((row) => `${row.lastName} ${row.firstName}`, {
    //   id: 'フルネーム',
    // }),
    // columnHelper.accessor('birth', {
    //   header: '誕生日',
    //   cell: (props) => props.getValue().toUpperCase(), // 列のデータを一括加工処理（例：大文字変換）
    // }),
    // columnHelper.accessor('gender', {
    //   header: '性別',
    // }),
    // columnHelper.display({
    //   header: "概要",
    //   id: "description",
    //   cell: (props) => (
    //     <span style={{ backgroundColor: "#eee" }}>
    //       {props.row.original.description}
    //     </span>
    //   ),
    // }),
  ];

  // Require: data, colums, getCoreRowModel
  const table = useReactTable({
    data: rows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  table.getHeaderGroups().map((headerGroup) => {
    // console.log(headerGroup);
    // -> [depth: 0, headers(4)[...], id: "0"]
  });


  return (
    <div style={{ margin: '2em' }}>
      <h1>Tanstack Table</h1>
      <table>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))
          }
        </thead>
        <tbody>

          {
            // .getRowModel().rows.slice(0, -1)で表示件数を変更可
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
      <p>Rows Number: {table.getRowModel().rows.length}</p>
    </div>
  );
}

export default TanstackTable