import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import API from '../shared/api';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function CharacterCard() {
  const [characterData, setCharacterData] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [reload, setReload] = useState(false);

  // API call to get data
  useEffect(() => {
    API.get('/api/character_overview/')
      .then((response) => {
        setCharacterData(response.data);
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

  const createNewCharacter = () => {
    API.post('/api/character_create/', { name: newCharacterName }).then((response) =>
      console.log(response)
    );
    setReload(true);
  };

  return (
    <>
      <h2>Charakter Übersicht</h2>
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
                      key={`character-overview-table-body-cell-${cell.row.id}${cell.column.id}-${cell.value}`}>
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
      <div>
        <p>Neuer Charakter:</p>
        Name:{' '}
        <input
          type="text"
          value={newCharacterName}
          onChange={(e) => setNewCharacterName(e.target.value)}
        />
        <Button onClick={createNewCharacter}>Erstellen!</Button>
      </div>
    </>
  );
}
CharacterCard.propTypes = {};
