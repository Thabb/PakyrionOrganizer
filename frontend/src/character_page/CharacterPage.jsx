import { useEffect, useState } from 'react';
import API from '../shared/api';
import { useParams } from 'react-router-dom';

/**
 * @return {JSX.Element}
 */
export default function CharacterPage() {
  const [characterData, setCharacterData] = useState([]);
  const { characterId } = useParams();

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
    console.log(characterData);
    return Object.entries(characterData).map(([key, value]) => {
      return (
        <tr key={`character-table-${key}-${value}`}>
          <th key={`character-table-${key}`}>{key}</th>
          <td key={`character-table-${value}`}>{value}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <h1>Character Page</h1>
      <table>
        <tbody>{generateCharacterPresentation()}</tbody>
      </table>
    </>
  );
}
