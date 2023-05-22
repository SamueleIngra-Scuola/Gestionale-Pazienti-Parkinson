import { Meteor } from 'meteor/meteor';
import { Fogs } from '../../api/FoGs.js';

/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable meteor/audit-argument-checks */

Meteor.methods({
  'upsertFogEpisode': function (body) {
    try {
      const { id, patient, length, distance, frequency, intensity, episodedate } = body;
      Fogs.collection.upsert({ _id: id }, {
        $set: {
          patient: patient,
          length: length,
          distance: distance,
          frequency: frequency,
          intensity: intensity,
          episodedate: episodedate,
        },
      });
    } catch (e) {
      throw new Meteor.Error('fog-error', `C'è stato un errore nella creazione dell'episodio FoG, Errore: ${e}`);
    }
  },
  'deleteFogEpisode': function (episodeId) {
    try {
      Fogs.collection.remove({ _id: episodeId });
      console.log('Episode removed');
    } catch (e) {
      throw new Meteor.Error('episode-deletion-error', `C'è stato un errore nell'eliminazione dell'episodio, Errore: ${e}`);
    }
  },
  'getFogEpisode': function (body) {
    try {
      const { id } = body;
      const episode = Fogs.collection.findOne({ _id: id });
      return episode;
    } catch (e) {
      throw new Meteor.Error('fog-retrievalerror', `C'è stato un errore nella richiesta dell'episodio FoG, Errore: ${e}`);
    }
  },
  'getFogEpisodes': function (patientId) {
    try {
      const episodesList = Fogs.collection.find({ patient: patientId }).fetch();
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
