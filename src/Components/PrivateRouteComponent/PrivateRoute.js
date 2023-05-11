import { Navigate, Route } from 'react-router-dom';


export default function PrivateRoute({ element, path }) {
  const token = localStorage.getItem('token');

  const ele = token ? element : <Navigate to="/Home"  />;

  return (
    
    <Route path={path} element={ele} />
    // <Route {...rest} element={token ? <Component /> : <Navigate to="/Signin" />} />
  );
}