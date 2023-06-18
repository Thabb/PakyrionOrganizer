import API from '../shared/api';
import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

/**
 * aa
 * @constructor
 */
export default function ConventionSignUpPage() {
  const [characterData, setCharacterData] = useState([]);
  const [conventionCharacters, setConventionCharacters] = useState([]);
  const { conventionId } = useParams();

  useEffect(() => {
    API.get('/api/character_overview/')
      .then((response) => {
        setCharacterData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
      },
      {
        Header: 'ID',
        accessor: 'id'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: characterData
  });

  const addCharacterToSignUp = (characterId) => {
    conventionCharacters.push(characterId);
  };

  const removeCharacterFromSignUp = (characterId) => {
    setConventionCharacters(conventionCharacters.filter((element) => element !== characterId));
  };

  const createNewConventionSignUp = () => {
    API.post(`/api/convention_signup/${conventionId}`, { characterIds: conventionCharacters }).then(
      (response) => console.log(response)
    );
  };

  return (
    <>
      <h1>Convention Anmeldung</h1>
      Mit welchen Charakteren willst du dich für die Convention anmelden?
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
                  if (cell.column.id === 'id') return;
                  return (
                    <td
                      {...cell.getCellProps}
                      key={`character-overview-table-body-cell-${cell.row.id}${cell.column.id}-${cell.value}`}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
                <td>
                  <Button
                    onClick={() => {
                      addCharacterToSignUp(row.values.id);
                    }}>
                    Hinzufügen
                  </Button>
                  <Button
                    onClick={() => {
                      removeCharacterFromSignUp(row.values.id);
                    }}>
                    Entfernen
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button onClick={createNewConventionSignUp}>Anmeldung abschicken</Button>
    </>
  );
}