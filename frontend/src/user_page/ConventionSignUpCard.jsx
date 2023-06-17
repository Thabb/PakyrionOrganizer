import { useEffect, useMemo, useState } from 'react';
import API from '../shared/api';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

/**
 * a
 * @constructor
 */
export default function ConventionSignUpCard() {
  const [conventionData, setConventionData] = useState([]);
  // API call to get data
  useEffect(() => {
    API.get('/api/convention_overview/')
      .then((response) => {
        setConventionData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // columns for the table
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: conventionData
  });

  return (
    <>
      <h2>Convention Übersicht</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps} key={'convention-overview-table-head-row'}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps}
                    key={`convention-overview-table-head-cell-${column.id}`}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps} key={`convention-overview-table-body-row-${row.id}`}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps}
                      key={`convention-overview-table-body-cell-${cell.row.id}${cell.column.id}-${cell.value}`}>
                      {cell.render('Cell')}
                      <Link
                        to={`/signup/${
                          conventionData.find((convention) => convention['name'] === cell.value)[
                            'id'
                          ]
                        }`}>
                        Anmelden
                      </Link>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
