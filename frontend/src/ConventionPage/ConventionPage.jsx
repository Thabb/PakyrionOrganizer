import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../shared/api';
import { Button } from 'react-bootstrap';

/**
 * y
 * @return {JSX.Element}
 * @constructor
 */
export default function ConventionPage() {
  const [conventionData, setConventionData] = useState([]);
  const [formData, setFormData] = useState({});
  const { conventionId } = useParams();

  // initialize formData with data from the API
  useCallback(
    () =>
      Object.entries(conventionData).map(([key, value]) => {
        formData[key] = value;
      }),
    []
  );

  // API call to get data
  useEffect(() => {
    API.get(`/api/convention/${conventionId}`)
      .then((response) => {
        setConventionData(response.data);
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
    API.post(`/api/convention_save/${conventionId}`, formData).then((response) =>
      console.log(response)
    );
  };

  const deleteConvention = () => {
    API.post(`/api/convention_delete/${conventionId}`).then((response) => console.log(response));
    const link = document.createElement('a');
    link.setAttribute('href', 'javascript:history.back();');
    link.click();
  };

  return (
    <>
      <h1>Character Page</h1>
      <table>
        <tbody>{generateConventionPresentation()}</tbody>
      </table>
      <Button onClick={saveConventionData}>Speichern!</Button>
      <Button onClick={deleteConvention}>Convention löschen!</Button>
    </>
  );
}
