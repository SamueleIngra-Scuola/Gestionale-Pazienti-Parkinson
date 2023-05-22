import { Meteor } from 'meteor/meteor';
import { Therapies } from '../../api/Therapies.js';

/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable meteor/audit-argument-checks */

Meteor.methods({
  'upsertTherapy': function (body) {
    try {
      const { id, patient, drug, dosage, prescriptiondate } = body;
      Therapies.collection.upsert({ _id: id }, {
        $set: {
          patient: patient,
          drug: drug,
          dosage: dosage,
          prescriptiondate: prescriptiondate,
        },
      });
    } catch (e) {
      throw new Meteor.Error('therapy-create-error', `C'è stato un errore nella creazione della terapia, Errore: ${e}`);
    }
  },
  'editTherapy': function (body) {
    const { id, drug, dosage, prescriptiondate } = body;

    try {
      Therapies.collection.update({ _id: id }, {
        $push: {
          drug: drug,
          dosage: dosage,
          prescriptiondate: prescriptiondate,
        },
      });
    } catch (e) {
      throw new Meteor.Error('therapy-edit-error', `C'è stato un errore nella modifica della terapia, Errore: ${e}`);
    }
  },
  'deleteTherapy': function (therapyId) {
    try {
      Therapies.collection.remove({ _id: therapyId });
      console.log('Therapy removed');
    } catch (e) {
      throw new Meteor.Error('therapy-deletion-error', `C'è stato un errore nell'eliminazione della terapia Errore: ${e}`);
    }
  },
  'getTherapy': function (body) {
    try {
      const { id } = body;
      const therapy = Therapies.collection.findOne({ _id: id });
      return therapy;
    } catch (e) {
      throw new Meteor.Error('therapy-retrievalerror', `C'è stato un errore nella richiesta della terapia, Errore: ${e}`);
    }
  },
  'getTherapiesHistory': function (patientId) {
    try {
      const therapiesList = Therapies.collection.find({ patient: patientId }).fetch();
      return therapiesList;
    } catch (e) {
      throw new Meteor.Error('therapy-retrievalerror', `C'è stato un errore nella richiesta della lista di terapie, Errore: ${e}`);
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
