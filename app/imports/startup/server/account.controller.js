import { Meteor } from 'meteor/meteor';
import { isNil } from 'lodash';
import { Random } from 'meteor/random';
import { Medics } from '../../api/Medics.js';
import { Patients } from '../../api/Patients.js';

/* eslint-disable no-console */

Meteor.methods({
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'createUserAccount': function (body) {
    const { email, password, name, surname, phone, birthday, birthplace, role } = body;
    const token = Random.secret();
    let user = {
      username: email,
      password: password,
      name: name,
      surname: surname,
      phone: phone,
      birthday: birthday,
      birthplace: birthplace,
      authToken: token,
    };
    if (isNil(Patients.collection.findOne({ username: email }) && isNil(Medics.collection.findOne({ username: email })))) {
      if (role === 'medic') {
        Medics.collection.insert(user);
        user = Medics.collection.findOne({ username: email });
      } else if (role === 'patient') {
        Patients.collection.insert(user);
        user = Patients.collection.findOne({ username: email });
      } else {
        throw new Meteor.Error('invalid-role', 'Questo ruolo non esiste');
      }
    } else {
      throw new Meteor.Error('existing-email', 'Un account con questa E-Mail esiste già, inseriscine una diversa');
    }

    console.log(user);
    return user;
  },
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'loginUserAccount': function (body) {
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
