import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../shared/api';
import { Button, Table } from 'react-bootstrap';

/**
 * a
 * @constructor
 */
export default function ConventionDetailsCard() {
  const [conventionData, setConventionData] = useState([]);
  const [formData, setFormData] = useState({});
  const { conventionId } = useParams();

  useEffect(() => {
    API.get(`/api/convention/${conventionId}`)
      .then((response) => {
        setConventionData(response.data);
        Object.entries(response.data).map(([key, value]) => {
          formData[key] = value;
        });
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * @return {JSX.Element[]}
   */
  const generateConventionPresentation = () => {
    const keyDict = {
      name: 'Name',
      start_date: 'Anreisetag',
      end_date: 'Abreisetag',
      max_players: 'Anzahl Spieler',
      max_npcs: 'Anzahl NSCs'
    };
    return Object.entries(conventionData).map(([key, value]) => {
      return (
        <tr key={`convention-table-${key}-${value}`}>
          <th key={`convention-table-${key}`}>{keyDict[key]}</th>
          <td key={`convention-table-${value}`}>
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

  const saveConventionData = () => {
    API.post(`/api/convention_save/${conventionId}`).then((response) => console.log(response));
  };

  const deleteConvention = () => {
    API.post(`/api/convention_delete/${conventionId}`).then((response) => console.log(response));
  };

  return (
    <>
      <h2>Veranstaltung bearbeiten</h2>
      <Table>
        <tbody>
          {generateConventionPresentation()}
          <tr>
            <td>
              <Button
                className="form-button-danger form-button-width-100"
                onClick={deleteConvention}>
                Convention löschen!
              </Button>
            </td>
            <td>
              <Link to={'/admin/'}>
                <Button className="form-button form-button-width-100" onClick={saveConventionData}>
                  Speichern!
                </Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
