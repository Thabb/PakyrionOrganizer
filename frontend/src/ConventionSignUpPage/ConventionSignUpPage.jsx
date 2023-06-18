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
  const [conventionSignUpStatus, setConventionSignUpStatus] = useState(false);
  const [conventionSignUpExists, setConventionSignUpExists] = useState(false);
  const [reload, setReload] = useState(false);
  const { conventionId } = useParams();

  useEffect(() => {
    API.get('/api/character_overview/')
      .then((response) => {
        setCharacterData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    API.get(`/api/convention_signup_get/${conventionId}`)
      .then((response) => {
        if (response.data.user) {
          setConventionSignUpExists(true);
        } else {
          setConventionSignUpExists(false);
        }
        setConventionSignUpStatus(response.data.status);
        setReload(false);
      })
      .catch((error) => console.log(error));
  }, [reload]);

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
      (response) => {
        console.log(response);
        setReload(true);
      }
    );
  };

  const deleteConventionSignUp = () => {
    API.post(`/api/convention_signup_delete/${conventionId}`).then((response) => {
      console.log(response);
      setReload(true);
    });
  };

  return (
    <>
      <h1>Convention Anmeldung</h1>

      <div>
        {conventionSignUpExists ? (
          ''
        ) : (
          <div>
            Mit welchen Charakteren willst du dich für die Convention anmelden?
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => {
                  return (
                    <tr
                      {...headerGroup.getHeaderGroupProps}
                      key={'character-overview-table-head-row'}>
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
          </div>
        )}
      </div>
      <div>
        {conventionSignUpExists ? (
          <div>
            <p>Status der Anmeldung: {conventionSignUpStatus ? 'Angenommen' : 'Abgeschickt'}</p>
            <Button onClick={deleteConventionSignUp}>Anmeldung löschen</Button>
          </div>
        ) : (
          'Noch kein Anmeldung abgeschickt!'
        )}
      </div>
    </>
  );
}
