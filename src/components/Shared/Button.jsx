const Button = ({ children, size, onClick }) => {
  return <button
    className={`btn-toggle ${size ? 'btn-big' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
}

export default Button;