import { useCallback, useEffect, useState } from 'react';
import API from '../shared/api';
import { Button, Table } from 'react-bootstrap';

/**
 * ad
 * @return {JSX.Element}
 * @constructor
 */
export default function UserDataCard() {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({});

  // initialize formData with data from the API
  useCallback(
    () =>
      Object.entries(userData).map(([key, value]) => {
        formData[key] = value;
      }),
    []
  );

  // API call to get data
  useEffect(() => {
    API.get('/api/user_data/')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * @return {JSX.Element[]}
   */
  const generateUserDataPresentation = () => {
    const keyDict = {
      first_name: 'Vorname',
      last_name: 'Nachname',
      birth_date: 'Geburtstag',
      allergies: 'Allergien'
    };
    return Object.entries(userData).map(([key, value]) => {
      if (key === 'user_id') return;
      return (
        <tr key={`user-data-table-${key}-${value}`}>
          <th key={`user-data-table-${key}`}>{keyDict[key]}</th>
          <td key={`user-data-table-${value}`}>
            <input
              className="form-control"
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

  const saveUserData = () => {
    API.post('/api/user_data_save/', formData).then((response) => console.log(response));
  };

  return (
    <>
      <h2>Benutzerdetails</h2>
      <Table className="table-borderless">
        <tbody>
          {generateUserDataPresentation()}
          <tr>
            <td />
            <td>
              <Button className="form-button form-button-width-100" onClick={saveUserData}>
                Speichern!
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
