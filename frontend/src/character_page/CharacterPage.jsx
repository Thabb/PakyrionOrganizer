import { useEffect, useState } from 'react';
import API from '../shared/api';
import { useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

/**
 * @return {JSX.Element}
 */
export default function CharacterPage() {
  const [characterData, setCharacterData] = useState([]);
  const [formData, setFormData] = useState({});
  const { characterId } = useParams();

  // API call to get data
  useEffect(() => {
    API.get(`/api/character/${characterId}`)
      .then((response) => {
        setCharacterData(response.data);
        Object.entries(response.data).map(([key, value]) => {
          formData[key] = value;
        });
      })

      .catch((error) => console.log(error));
  }, []);

  /**
   * @return {JSX.Element[]}
   */
  const generateCharacterPresentation = () => {
    const keyDict = {
      name: 'Name',
      title: 'Titel/ Stand',
      group: 'Gruppe/ Heimat',
      profession: 'Profession',
      character_class: 'Klasse',
      specialized: 'Spezialisiert?',
      con_days: 'Contage (Charakter)',
      species: 'Spezies',
      faith: 'Glaube',
      alignment: 'Gesinnung'
    };
    return Object.entries(characterData).map(([key, value]) => {
      if (key === 'user_id') return;
      return (
        <tr key={`character-table-${key}-${value}`}>
          <th key={`character-table-${key}`}>{keyDict[key]}</th>
          <td key={`character-table-${value}`}>
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

  const saveCharacterData = () => {
    API.post(`/api/character_save/${characterId}`, formData).then((response) =>
      console.log(response)
    );
  };

  const deleteCharacter = () => {
    API.post(`/api/character_delete/${characterId}`).then((response) => console.log(response));
    const link = document.createElement('a');
    link.setAttribute('href', 'javascript:history.back();');
    link.click();
  };

  return (
    <>
      <h1>Charakterdetails</h1>
      <Container>
        <Row>
          <Col md={6}>
            <Table>
              <tbody>
                {generateCharacterPresentation()}
                <tr>
                  <td>
                    <Button
                      className="form-button-danger form-button-width-100"
                      onClick={deleteCharacter}>
                      Charakter löschen!
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="form-button form-button-width-100"
                      onClick={saveCharacterData}>
                      Speichern!
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
