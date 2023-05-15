/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  localStorage.removeItem('user');
  // window.location.reload(false);
  // return <Navigate to = '/' />;
};

export default SignOut;
