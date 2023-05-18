import { Meteor } from 'meteor/meteor';
import { isNil } from 'lodash';
import { Patients } from '../../api/Patients.js';

/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable meteor/audit-argument-checks */
Meteor.methods({
  'getPatientsList': function () {
    try {
      const patientsList = Patients.collection.find({ assistedBy: { $exists: false } }).fetch();
      return patientsList;
    } catch (e) {
      throw new Meteor.Error('patientslist-retrievalerror', `C'è stato un errore nella richiesta della lista di pazienti, Errore: ${e}`);
    }
  },
  'getAssistedPatientsList': function (body) {
    try {
      const { medicId } = body;
      const patientsList = Patients.collection.find({ assistedBy: medicId }).fetch();
      return patientsList;
    } catch (e) {
      throw new Meteor.Error('patientslist-retrievalerror', `C'è stato un errore nella richiesta della lista di pazienti, Errore: ${e}`);
    }
  },
  'assistPatient': function (body) {
    try {
      const { patientId, medicId } = body;
      const patient = Patients.collection.findOne({ _id: patientId });
      if (isNil(patient.assistedBy)) {
        console.log('Ci siamo');
        Patients.collection.update({ _id: patientId }, {
          $set: {
            assistedBy: medicId,
          },
        });
      }
      throw new Meteor.Error('patient-already-assigned', 'Questo paziente è già stato preso');

    } catch (e) {
      throw new Meteor.Error('patient-assign-error', `C'è stato un errore nell'assegnazione del paziente, Errore: ${e}`);
    }
  },
  'unassistPatient': function (body) {
    const { patientId, medicId } = body;
    const patient = Patients.collection.findOne({ _id: patientId });
    try {
      if (!isNil(patient.assistedBy)) {
        console.log('Ci sei!');
        Patients.collection.update({ _id: patientId }, {
          $unset: {
            'assistedBy': medicId,
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
