import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/app/SignUp';
import SignOut from '../pages/app/SignOut';
import SignIn from '../pages/app/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import Landing from '../pages/Landing';
import Home from '../pages/app/Home';
import AssistedPatientsList from '../pages/medic/AssistedPatientsList';
import PatientsList from '../pages/medic/PatientsList';
import AdminMedicsList from '../pages/medic/admin/AdminMedicsList';
import AdminPatientsList from '../pages/medic/admin/AdminPatientsList';
import FogEpisodesHistory from '../pages/patient/FogEpisodesHistory';
import TherapiesHistory from '../pages/patient/TherapiesHistory';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/panel/home" element={<Home />} />
          <Route path="/panel/assistedpatientslist" element={<AdminProtectedRoute ready={ready}> <AssistedPatientsList /> </AdminProtectedRoute>} />
          <Route path="/panel/patientslist" element={<AdminProtectedRoute ready={ready}> <PatientsList /> </AdminProtectedRoute>} />
          <Route path="/panel/admin/medicslist" element={<AdminProtectedRoute ready={ready}> <AdminMedicsList /> </AdminProtectedRoute>} />
          <Route path="/panel/admin/patientslist" element={<AdminProtectedRoute ready={ready}> <AdminPatientsList /> </AdminProtectedRoute>} />
          <Route path="/panel/fogepisodeshistory" element={<ProtectedRoute> <FogEpisodesHistory /> </ProtectedRoute>} />
          <Route path="/panel/therapieshistory" element={<ProtectedRoute>  <TherapiesHistory /> </ProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = JSON.parse(localStorage.getItem('user'))._id !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = JSON.parse(localStorage.getItem('user'))._id !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = localStorage.getItem('role') === 'medic';
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
