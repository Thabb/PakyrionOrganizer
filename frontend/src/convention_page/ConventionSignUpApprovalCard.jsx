import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../shared/api';
import { useTable } from 'react-table';
import { Button, Table } from 'react-bootstrap';

/**
 * a
 * @constructor
 */
export default function ConventionSignUpApprovalCard() {
  const [conventionSignUpData, setConventionSignUpData] = useState([]);
  const { conventionId } = useParams();

  useEffect(() => {
    API.get(`/api/convention_signup_overview/${conventionId}`)
      .then((response) => {
        setConventionSignUpData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
      <h2>Anmeldungen einsehen</h2>
      <Table {...getTableProps()}>
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
              <tr {...row.getRowProps} key={`convention-signup-overview-table-body-row-${row.id}`}>
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
      </Table>
    </>
  );
}
