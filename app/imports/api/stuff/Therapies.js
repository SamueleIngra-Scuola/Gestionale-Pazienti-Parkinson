import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The TherapiesCollection. It encapsulates state and variable values for stuff.
 */
class TherapiesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'therapies';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      patient: String,
      drug: String,
      dosage: Number,
      prescriptiondate: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
  }
}

/**
 * The singleton instance of the TherapiesCollection.
 * @type {TherapiesCollection}
 */
export const Therapies = new TherapiesCollection();
