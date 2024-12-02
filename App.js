import React from 'react';
import useAuth from './hooks/useAuth';
import AuthenticatedNavigator from './navigation/AuthenticatedNavigator';
import NonAuthenticatedNavigator from './navigation/NonAuthenticatedNavigator';

const App = () => {
  const user = useAuth()

  return user ? <AuthenticatedNavigator /> : <NonAuthenticatedNavigator />;
};

export default App;