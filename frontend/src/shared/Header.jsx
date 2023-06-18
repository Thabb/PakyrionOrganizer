import { Link } from 'react-router-dom';

/**
 * a
 * @constructor
 */
export default function Header() {
  return (
    <>
      <div>
        <h1>
          <Link to={'/'}>PAKYRION ORGANIZER</Link>
        </h1>
      </div>
    </>
  );
}
