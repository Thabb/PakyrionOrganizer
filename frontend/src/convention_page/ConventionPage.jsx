import { useCallback, useEffect, useMemo, useState } from 'react';
import API from '../shared/api';
import { Button } from 'react-bootstrap';
import { useTable } from 'react-table';
import { useParams } from 'react-router-dom';

/**
 * y
 * @return {JSX.Element}
 * @constructor
 */
export default function ConventionPage() {
  const [conventionData, setConventionData] = useState([]);
  const [formData, setFormData] = useState({});
  const [conventionSignUpData, setConventionSignUpData] = useState([]);
  const { conventionId } = useParams();

  // initialize formData with data from the API
  useCallback(
    () =>
      Object.entries(conventionData).map(([key, value]) => {
        formData[key] = value;
      }),
    []
  );

  useEffect(() => {
    API.get(`/api/convention/${conventionId}`)
      .then((response) => {
        setConventionData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    API.get(`/api/convention_signup_overview/${conventionId}`)
      .then((response) => {
        setConventionSignUpData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * @return {JSX.Element[]}
   */
  const generateConventionPresentation = () => {
    return Object.entries(conventionData).map(([key, value]) => {
      return (
        <tr key={`convention-table-${key}-${value}`}>
          <th key={`convention-table-${key}`}>{key}</th>
          <td key={`convention-table-${value}`}>
            <input
              type="text"
              value={formData[key] || value || ''}
              onChange={(e) => {
                setFormData((values) => ({ ...values, [key]: e.target.value }));
              }}
            />
          </td>
        </tr>
      );
    });
  };

  const saveConventionData = () => {
    API.post(`/api/convention_save/${conventionId}`).then((response) => console.log(response));
  };

  const deleteConvention = () => {
    API.post(`/api/convention_delete/${conventionId}`).then((response) => console.log(response));
  };

  // columns for the convention signup table
  const columns = useMemo(
    () => [
      {
        Header: 'con_id',
        accessor: 'id'
      },
      {
        Header: 'ID',
        accessor: 'user.user_id'
      },
      {
        Header: 'Nachname',
        accessor: 'user.last_name'
      },
      {
        Header: 'Vorname',
        accessor: 'user.first_name'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: conventionSignUpData
  });

  const approveSignUp = (signupId) => {
    API.post(`/api/convention_signup_approve/${signupId}`).then((response) =>
      console.log(response)
    );
  };

  const disproveSignUp = (signupId) => {
    API.post(`/api/convention_signup_disprove/${signupId}`).then((response) =>
      console.log(response)
    );
  };

  return (
    <>
      <h1>Convention Page</h1>
      <div>
        <h2>Convention bearbeiten</h2>
        <table>
          <tbody>{generateConventionPresentation()}</tbody>
        </table>
        <Button onClick={saveConventionData}>Speichern!</Button>
        <Button onClick={deleteConvention}>Convention löschen!</Button>
      </div>

      <div>
        <h2>Anmeldungen einsehen</h2>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr
                  {...headerGroup.getHeaderGroupProps}
                  key={'convention-signup-overview-table-head-row'}>
                  {headerGroup.headers.map((column) => {
                    if (column.Header === 'con_id') return;
                    return (
                      <th
                        {...column.getHeaderProps}
                        key={`convention-signup-overview-table-head-cell-${column.id}`}>
                        {column.render('Header')}
                      </th>
                    );
                  })}
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
                  key={`convention-signup-overview-table-body-row-${row.id}`}>
                  {row.cells.map((cell) => {
                    if (cell.column.id === 'id') return;
                    return (
                      <td
                        {...cell.getCellProps}
                        key={`convention-signup-overview-table-body-cell-${cell.row.id}${cell.column.id}-${cell.value}`}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                  <td>
                    <Button
                      onClick={() => {
                        approveSignUp(row.values.id);
                      }}>
                      Bestätigen
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        disproveSignUp(row.values.id);
                      }}>
                      Ablehnen
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}