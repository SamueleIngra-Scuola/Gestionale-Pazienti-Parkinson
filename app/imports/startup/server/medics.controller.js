import { Meteor } from 'meteor/meteor';
import { Medics } from '../../api/Medics.js';

/* eslint-disable no-console */

Meteor.methods({
  // eslint-disable-next-line quote-props, meteor/audit-argument-checks
  'getMedicsList': function () {
    try {
      const medicsList = Medics.collection.find({}).fetch();
      return medicsList;
    } catch (e) {
      throw new Meteor.Error('medicslist-retrievalerror', `C'è stato un errore nella richiesta della lista di medici, Errore: ${e}`);
    }
  },
});
