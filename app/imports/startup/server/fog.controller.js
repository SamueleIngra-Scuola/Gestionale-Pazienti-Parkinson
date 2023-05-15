import { Meteor } from 'meteor/meteor';
import { Fogs } from '../../api/FoGs.js';

/* eslint-disable no-console */

Meteor.methods({
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'createFogEpisode': function (body) {
    const { patient, distance, frequency, intensity, date } = body;
    const episode = {
      patient: patient,
      distance: distance,
      frequency: frequency,
      intensity: intensity,
      episodedate: date,
    };

    try {
      Fogs.collection.insert(episode);
    } catch (e) {
      throw new Meteor.Error('fog-error', `C'è stato un errore nella creazione dell'episodio FoG, Errore: ${e}`);
    }
  },
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'editFogEpisode': function (body) {
    const { id, distance, frequency, intensity, date } = body;
    try {
      Fogs.collection.update({ _id: id }, {
        $push: {
          distance: distance,
          frequency: frequency,
          intensity: intensity,
          episodedate: date,
        },
      });
    } catch (e) {
      throw new Meteor.Error('fog-error', `C'è stato un errore nella creazione dell'episodio FoG, Errore: ${e}`);
    }
  },
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'getFogEpisode': function (body) {
    try {
      const { id } = body;
      const episode = Fogs.collection.findOne({ _id: id });
      return episode;
    } catch (e) {
      throw new Meteor.Error('fog-retrievalerror', `C'è stato un errore nella richiesta dell'episodio FoG, Errore: ${e}`);
    }
  },
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'getFogEpisodesList': function (body) {
    try {
      const { patient } = body;
      const episodesList = Fogs.collection.find({ patient: patient }).fetch();
      return episodesList;
    } catch (e) {
      throw new Meteor.Error('fog-retrievalerror', `C'è stato un errore nella richiesta della lista di episodi FoG, Errore: ${e}`);
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