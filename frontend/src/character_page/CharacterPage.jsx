import { useCallback, useEffect, useState } from 'react';
import API from '../shared/api';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

/**
 * @return {JSX.Element}
 */
export default function CharacterPage() {
  const [characterData, setCharacterData] = useState([]);
  const [formData, setFormData] = useState({});
  const { characterId } = useParams();

  // initialize formData with data from the API
  useCallback(
    () =>
      Object.entries(characterData).map(([key, value]) => {
        formData[key] = value;
      }),
    []
  );

  // API call to get data
  useEffect(() => {
    API.get(`/api/character/${characterId}`)
      .then((response) => {
        setCharacterData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * @return {JSX.Element[]}
   */
  const generateCharacterPresentation = () => {
    return Object.entries(characterData).map(([key, value]) => {
      return (
        <tr key={`character-table-${key}-${value}`}>
          <th key={`character-table-${key}`}>{key}</th>
          <td key={`character-table-${value}`}>
            <input
              type="text"
              value={formData[key] || value}
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

  return (
    <>
      <h1>Character Page</h1>
      <table>
        <tbody>{generateCharacterPresentation()}</tbody>
      </table>
      <Button onClick={saveCharacterData}>Speichern!</Button>
    </>
  );
}
