import { Meteor } from 'meteor/meteor';
import { isNil } from 'lodash';
import { Random } from 'meteor/random';
import { Medics } from '../../api/Medics.js';
import { Patients } from '../../api/Patients.js';

/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable meteor/audit-argument-checks */

Meteor.methods({
  'createUserAccount': function (body) {
    try {
      const { username, password, name, surname, birthday, phone, birthplace, role } = body;
      const token = Random.secret();
      let user = {
        username: username,
        password: password,
        name: name,
        surname: surname,
        phone: phone,
        birthday: birthday,
        birthplace: birthplace,
        authToken: token,
      };
      if (isNil(Patients.collection.findOne({ username: username }) && isNil(Medics.collection.findOne({ username: username })))) {
        if (role === 'medic') {
          Medics.collection.insert(user);
          user = Medics.collection.findOne({ username: username });
        } else if (role === 'patient') {
          Patients.collection.insert(user);
          user = Patients.collection.findOne({ username: username });
        } else {
          throw new Meteor.Error('invalid-role', 'Questo ruolo non esiste');
        }
      } else {
        throw new Meteor.Error('existing-email', 'Un account con questa E-Mail esiste già, inseriscine una diversa');
      }
      console.log(user);
      return user;
    } catch (e) {
      throw new Meteor.Error('account-creation-error', `C'è stato un errore nella creazione dell'account, Errore: ${e}`);
    }

  },
  'loginUserAccount': function (body) {
    try {
      const { email, password } = body;
      let user = Patients.collection.findOne({ username: email, password: password });
      if (!isNil(user)) {
        return { user: user, role: 'patient' };
      }
      user = Medics.collection.findOne({ username: email, password: password });
      if (!isNil(user)) {
        return { user: user, role: 'medic' };
      }
      throw new Meteor.Error('invalid-credentials', 'E-Mail o Password sbagliate, Riprova');
    } catch (e) {
      throw new Meteor.Error('account-login-error', `C'è stato un errore nel login all'account, Errore: ${e}`);
    }
  },
  'deleteUserAccount': function (body) {
    try {
      const { userId } = body;
      if (!isNil(Patients.collection.remove({ _id: userId })) || !isNil(Medics.collection.remove({ _id: userId }))) {
        console.log('Account removed');
      } else {
        throw new Meteor.Error('invalid-credentials', 'Non esiste un account con queste credenziali');
      }
    } catch (e) {
      throw new Meteor.Error('account-deletion-error', `C'è stato un errore nella creazione dell'account, Errore: ${e}`);
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
