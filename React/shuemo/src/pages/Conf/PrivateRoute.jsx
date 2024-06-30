import React from 'react';

const PrivateRoute = ({ element: Element, loggedIn, ...rest }) => {
  // Para propósitos de desarrollo, siempre renderiza el elemento.
  // Una vez que la autenticación esté implementada, descomenta la siguiente línea y comenta la línea de renderizado de desarrollo.
  // return loggedIn ? <Element {...rest} /> : <Navigate to="/login" />;
  
  return <Element {...rest} />;
};

export default PrivateRoute;
