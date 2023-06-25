import { useEffect, useState } from 'react';
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

  // API call to get data
  useEffect(() => {
    API.get('/api/user_data/')
      .then((response) => {
        setUserData(response.data);
        // initialize formData with data from the API
        Object.entries(response.data).map(([key, value]) => {
          formData[key] = value;
        });
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
      street: 'Straße',
      zipcode: 'PLZ',
      city: 'Ort',
      telephone: 'Festnetz',
      mobile: 'Mobiltelefon',
      birth_date: 'Geburtstag',
      con_days: 'Contage (Spieler)',
      sicknesses: 'Krankheiten',
      allergies: 'Allergien',
      vegetarian: 'Vegetarier',
      vegan: 'Veganer',
      privacy_information: 'Privatinformation',
      privacy_photos: 'Bildveröffentlichung'
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
              value={formData[key] || ''}
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
