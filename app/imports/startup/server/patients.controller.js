import { Meteor } from 'meteor/meteor';
import { isNil } from 'lodash';
import { Patients } from '../../api/Patients.js';

/* eslint-disable no-console */

Meteor.methods({
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'getPatientsList': function () {
    try {
      const patientsList = Patients.collection.find({}).fetch();
      return patientsList;
    } catch (e) {
      throw new Meteor.Error('patientslist-retrievalerror', `C'è stato un errore nella richiesta della lista di pazienti, Errore: ${e}`);
    }
  },
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'getAssignedPatientsList': function (body) {
    try {
      const { doctorId } = body;
      const patientsList = Patients.collection.find({ assistedBy: doctorId }).fetch();
      return patientsList;
    } catch (e) {
      throw new Meteor.Error('patientslist-retrievalerror', `C'è stato un errore nella richiesta della lista di pazienti, Errore: ${e}`);
    }
  },
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'assignPatient': function (body) {
    const { patientId, doctorId } = body;
    const patient = Patients.collection.findOne({ _id: patientId });

    try {
      if (isNil(patient.assistedBy)) {
        Patients.collection.update({ _id: patientId }, {
          $push: {
            assistedBy: doctorId,
          },
        });
      } else {
        throw new Meteor.Error('patient-already-assigned', 'Questo paziente è già stato preso');
      }
    } catch (e) {
      throw new Meteor.Error('patient-assign-error', `C'è stato un errore nell'assegnazione del paziente, Errore: ${e}`);
    }
  },
});

/* if (Meteor.settings.defaultAccounts) {
  console.log('Creating the default user(s)');
  Meteor.settings.defaultAccounts.forEach(({ email, password, name, surname, phone, birthday, birthplace, role }) => createUser(email, password, name, surname, phone, birthday, birthplace, role));
} else {
  console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
} */

// When running app for first time, pass a settings file to set up a default user account.
/* if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, name, surname, phone, birthday, birthplace, role }) => createUser(email, password, name, surname, phone, birthday, birthplace, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
} */
