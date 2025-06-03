import React from 'react';
import { useRouter } from './utils/router';
import { StudentApp } from './components/student/StudentApp';
import { AdminApp } from './components/admin/AdminApp';

const App = () => {
  const { currentPath, navigate } = useRouter();

  if (currentPath === '/admin') {
    return <AdminApp navigate={navigate} />;
  }

  return <StudentApp navigate={navigate} />;
};

export default App;
