import { Meteor } from 'meteor/meteor';
import { Medics } from '../../api/Medics.js';

/* eslint-disable no-console */
/* eslint-disable quote-props */
/* eslint-disable meteor/audit-argument-checks */

Meteor.methods({
  'getMedicsList': function () {
    try {
      const medicsList = Medics.collection.find({}).fetch();
      return medicsList;
    } catch (e) {
      throw new Meteor.Error('medicslist-retrievalerror', `C'è stato un errore nella richiesta della lista di medici, Errore: ${e}`);
    }
  },
});
