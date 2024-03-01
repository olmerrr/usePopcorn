const Navbar = ({ children }) => {

  return <header className="header">
    <nav className="nav-bar">
      {children}
    </nav>
  </header>
};
export default Navbar;