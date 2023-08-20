import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthChecker from './components/AuthChecker';

const Login = lazy(() => import('./pages/login'));
const Index = lazy(() => import('./pages/index'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path="/" element={<Index />} />

          <Route path="/login" element={<Login />} />

          <Route path="/index" element={<Index />} />

          {/*Protected route with AuthChecker */}
          <Route path="/profile" element={<AuthChecker>
            <Profile />
          </AuthChecker>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
