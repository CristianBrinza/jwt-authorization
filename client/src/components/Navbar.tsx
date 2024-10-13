//src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>&nbsp;
      {authContext?.user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>&nbsp;
          <button onClick={authContext.logout}>Logout</button>&nbsp;
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>&nbsp;
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
