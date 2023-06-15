import CharacterCard from './CharacterCard';
import UserDataCard from './UserDataCard';

/**
 *
 * @return {JSX.Element}
 * @constructor
 * */
export default function UserPage() {
  return (
    <>
      <h1>User Page</h1>

      <UserDataCard />

      <CharacterCard />
    </>
  );
}
