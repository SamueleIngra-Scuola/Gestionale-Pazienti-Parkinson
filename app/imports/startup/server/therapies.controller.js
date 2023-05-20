import { Meteor } from 'meteor/meteor';
import { Therapies } from '../../api/Therapies.js';

/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable meteor/audit-argument-checks */

Meteor.methods({
  'createTherapy': function (body) {
    const { patientId, drug, dosage, prescriptiondate } = body;
    const therapy = {
      patient: patientId,
      drug: drug,
      dosage: dosage,
      prescriptiondate: prescriptiondate,
    };

    try {
      Therapies.collection.insert(therapy);
    } catch (e) {
      throw new Meteor.Error('therapy-create-error', `C'è stato un errore nella creazione della terapia, Errore: ${e}`);
    }
  },
  'editTherapy': function (body) {
    const { id, drug, dosage } = body;

    try {
      Therapies.collection.update({ _id: id }, {
        $push: {
          drug: drug,
          dosage: dosage,
        },
      });
    } catch (e) {
      throw new Meteor.Error('therapy-edit-error', `C'è stato un errore nella modifica della terapia, Errore: ${e}`);
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
  'getTherapiesHistory': function (body) {
    try {
      const { patientId } = body;
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
