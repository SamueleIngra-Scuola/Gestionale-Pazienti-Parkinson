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

      return { user: user, role: role };
    } catch (e) {
      throw new Meteor.Error('account-creation-error', `C'è stato un errore nella creazione dell'account, Errore: ${e}`);
    }

  },
  'loginUserAccount': function (body) {
    try {
      const { email, password } = body;

      let user = Patients.collection.findOne({ username: email });
      if (!isNil(user)) {
        if (user.password === password) return { user: user, role: 'patient' };
        throw new Meteor.Error('invalid-credentials', 'E-Mail o Password sbagliate, Riprova');
      }

      user = Medics.collection.findOne({ username: email });
      if (!isNil(user)) {
        if (user.password === password) return { user: user, role: 'medic' };
        throw new Meteor.Error('invalid-credentials', 'E-Mail o Password sbagliate, Riprova');
      }

      throw new Meteor.Error('invalid-credentials', 'E-Mail o Password sbagliate, Riprova');
    } catch (e) {
      throw new Meteor.Error('account-login-error', `C'è stato un errore nel login all'account, Errore: ${e}`);
    }
  },
  'deleteUserAccount': function (userId) {
    try {
      Patients.collection.remove({ _id: userId });
      Medics.collection.remove({ _id: userId });
      console.log('Account removed');
    } catch (e) {
      throw new Meteor.Error('account-deletion-error', `C'è stato un errore nell'eliminazione dell'account, Errore: ${e}`);
    }
  },
  'getAccountInfo': function (userId) {
    try {
      let user = Patients.collection.findOne({ _id: userId });

      if (isNil(user)) { user = Medics.collection.findOne({ _id: userId }); }

      return user;
    } catch (e) {
      throw new Meteor.Error('account-deletion-error', `C'è stato un errore nella ricerca dell'account, Errore: ${e}`);
    }
  },
});
