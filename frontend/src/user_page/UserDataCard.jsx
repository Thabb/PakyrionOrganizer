import { useCallback, useEffect, useState } from 'react';
import API from '../shared/api';
import { Button } from 'react-bootstrap';

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
    return Object.entries(userData).map(([key, value]) => {
      return (
        <tr key={`user-data-table-${key}-${value}`}>
          <th key={`user-data-table-${key}`}>{key}</th>
          <td key={`user-data-table-${value}`}>
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

  const saveUserData = () => {
    API.post('/api/user_data_save/', formData).then((response) => console.log(response));
  };

  return (
    <>
      <h2>Benutzerdetails</h2>
      <table>
        <tbody>{generateUserDataPresentation()}</tbody>
      </table>
      <Button onClick={saveUserData}>Speichern!</Button>
    </>
  );
}
