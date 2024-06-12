"use client";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "lastName",
    header: "苗字",
    cell: (info: any) => info.getValue(),
    // enableSorting: false
  },
  {
    accessorKey: "firstName",
    header: "名前",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "age",
    header: "年齢",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "score",
    header: "点数",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "birth",
    header: "誕生日",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "gender",
    header: "性別",
    cell: (info:any) => info.getValue(),
  },
  {
    accessorKey: "delete",
    header: "削除",
    cell: (info:any) => info.getValue(),
    enableHiding: true // カラムの表示/非表示をユーザーが切替できるか
  },
];

export const rows = [
  { id: 1, firstName: 'Taro', lastName: 'Yamada', age: 11, score: 12, birth: '1992年12月4日', description:'', gender: '男性', delete: '削除'},
  { id: 2, firstName: '富士子', lastName: '鈴木', age: 12, score: 45, birth: '1993年3月9日', description:'', gender: '', delete: '削除'},
  { id: 3, firstName: 'Daisuke', lastName: 'Saito', age: 19, score: 0, birth: 'February 18, 1994', description:"", gender: '', delete: '削除' },
  { id: 4, firstName: 'John', lastName: 'Doo', age: 18, score: 81, birth: '1994年9月12日', description:"", gender: '', delete: '削除' },
  { id: 5, firstName: 'じろう', lastName: '田中', age: 18, score: 9, birth: '1995年10月13日', description: "田中一郎さんは日本でよく使われる名前です。実在してるかは分かりません", delete: '削除' },
  { id: 6, firstName: 'シュン', lastName: 'Oguri', age: 40, score: 56, birth: '1995年12月30日', description:"",  gender: '女性', delete: '削除'  },
  { id: 7, firstName: '潤', lastName: '松本', age: 10, score: 97, birth: 'September 1, 1997', description:"", gender: '', delete: '削除' },
  { id: 8, firstName: 'Kazuya', lastName: 'Ninomiya', age: 18, score: 90, birth: '1983年6月17日', description:"", gender: '', delete: '削除' },
  { id: 9, firstName: '誠', lastName: '大野', age: 10, score: 92, birth: '1998年3月1日', description:"", gender: 'male', delete: '削除' },
  { id: 10, firstName: '智史', lastName: '相葉', age: 40, score: 88, birth: '1980年1月24日', description:"", gender: 'female', delete: '削除' }
];