import { useEffect, useMemo, useState } from 'react';
import API from '../shared/api';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/**
 * a
 * @constructor
 */
export default function ConventionCard() {
  const [conventionData, setConventionData] = useState([]);
  const [newConventionName, setNewConventionName] = useState('');
  const [reload, setReload] = useState(false);

  // API call to get data
  useEffect(() => {
    API.get('/api/convention_overview/')
      .then((response) => {
        setConventionData(response.data);
        setReload(false);
      })
      .catch((error) => console.log(error));
  }, [reload]);

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

  const createNewConvention = () => {
    API.post('/api/convention_create/', { name: newConventionName }).then((response) =>
      console.log(response)
    );
    setReload(true);
  };

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
                      <Link
                        to={`/convention/${row.original.id}`}
                        key={`convention-overview-table-link-${row}`}>
                        {cell.render('Cell')}
                      </Link>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <p>Neue Convention:</p>
        Name:{' '}
        <input
          className="form-control"
          type="text"
          value={newConventionName}
          onChange={(e) => setNewConventionName(e.target.value)}
        />
        <Button onClick={createNewConvention}>Erstellen!</Button>
      </div>
    </>
  );
}
