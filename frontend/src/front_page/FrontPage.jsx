import { Link } from 'react-router-dom';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function FrontPage() {
  return (
    <>
      <h1>Front Page</h1>
      <div>
        <Link to={'./user/1'}>user-1</Link>
      </div>
      <div>
        <Link to={'./user/2'}>user-2</Link>
      </div>
      <div>
        <Link to={'./user/3'}>user-3</Link>
      </div>
      <div>
        <Link to={'./user/4'}>user-4</Link>
      </div>
    </>
  );
}
