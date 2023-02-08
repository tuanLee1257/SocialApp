import AuthProvider from './AuthProvider';
import Routes from './Routes';

function Provider() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Provider;
