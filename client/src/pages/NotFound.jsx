import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container-x py-32 text-center">
    <h1 className="text-5xl font-bold text-navy-900 mb-4">404</h1>
    <p className="text-navy-800/60 mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-primary inline-flex">Back to Home</Link>
  </div>
);

export default NotFound;
