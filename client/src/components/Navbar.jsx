import PropTypes from "prop-types";
const Navbar = ({ user }) => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between text-white">
      <h1 className="text-2xl">Weather App</h1>
      {user ? (
        <a href="http://localhost:5000/auth/logout" className="hover:underline">
          Logout
        </a>
      ) : (
        <a href="http://localhost:5000/auth/google" className="hover:underline">
          Login with Google
        </a>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
