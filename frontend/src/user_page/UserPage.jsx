import { useParams } from 'react-router-dom';
import CharacterCard from './CharacterCard';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function UserPage() {
  const { userId } = useParams();
  return (
    <>
      <h1>User Page</h1>
      <CharacterCard userId={userId} />
    </>
  );
}
