import { useNavigate } from 'react-router-dom';
/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  const navigate = useNavigate();
  navigate('/signin');
};

export default SignOut;
