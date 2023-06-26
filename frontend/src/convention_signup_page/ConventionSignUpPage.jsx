import API from '../shared/api';
import { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
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
      <h1>Veranstaltungsanmeldung</h1>

      <Container>
        <Row>
          <Col>
            {conventionSignUpExists ? (
              ''
            ) : (
              <div>
                Mit welchen Charakteren willst du dich für die Convention anmelden?
                <Table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) => {
                      return (
                        <tr
                          {...headerGroup.getHeaderGroupProps}
                          key={'character-overview-table-head-row'}>
                          {headerGroup.headers.map((column) => {
                            if (column.Header === 'ID') return;
                            return (
                              <th
                                {...column.getHeaderProps}
                                key={`character-overview-table-head-cell-${column.id}`}>
                                {column.render('Header')}
                              </th>
                            );
                          })}
                          <th />
                          <th />
                        </tr>
                      );
                    })}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps}
                          key={`character-overview-table-body-row-${row.id}`}>
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
                              className="form-button form-button-width-100"
                              onClick={() => {
                                addCharacterToSignUp(row.values.id);
                              }}>
                              Hinzufügen
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="form-button-danger form-button-width-100"
                              onClick={() => {
                                removeCharacterFromSignUp(row.values.id);
                              }}>
                              Entfernen
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td>
                        <Button
                          className="form-button form-button-width-100"
                          onClick={createNewConventionSignUp}>
                          Anmeldung abschicken
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            {conventionSignUpExists ? (
              <div>
                <p>Status der Anmeldung: {conventionSignUpStatus ? 'Angenommen' : 'Abgeschickt'}</p>
                <Button className="form-button-danger" onClick={deleteConventionSignUp}>
                  Anmeldung löschen
                </Button>
              </div>
            ) : (
              <p>Noch kein Anmeldung abgeschickt!</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
