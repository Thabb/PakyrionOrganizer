import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import * as PropTypes from 'prop-types';
import API from '../shared/api';
import { Link } from 'react-router-dom';

/**
 *
 * @param {string} userId
 * @return {JSX.Element}
 * @constructor
 */
export default function CharacterCard({ userId }) {
  const [characterData, setCharacterData] = useState([]);

  // API call to get data
  useEffect(() => {
    API.get(`/api/character_overview/${userId}`)
      .then((response) => {
        setCharacterData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // columns for the table
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Profession',
        accessor: 'profession'
      },
      {
        Header: 'Gruppe',
        accessor: 'group'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: characterData
  });

  return (
    <>
      <p>Hier könnte ihre Werbung stehen</p>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps} key={'character-overview-table-head-row'}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps}
                    key={`character-overview-table-head-cell-${column.id}`}>
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
              <tr {...row.getRowProps} key={`character-overview-table-body-row-${row.id}`}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps}
                      key={`character-overview-table-body-cell-${cell.value}`}>
                      <Link
                        to={`/character/${row.original.id}`}
                        key={`character-overview-table-link-${row}`}>
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
    </>
  );
}
CharacterCard.propTypes = {
  userId: PropTypes.string.isRequired
};
