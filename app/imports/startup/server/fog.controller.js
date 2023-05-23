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
  'getFogEpisodes': function (patientId) {
    try {
      const episodesList = Fogs.collection.find({ patient: patientId }).fetch();
      return episodesList;
    } catch (e) {
      throw new Meteor.Error('fog-retrievalerror', `C'è stato un errore nella richiesta della lista di episodi FoG, Errore: ${e}`);
    }
  },
});
