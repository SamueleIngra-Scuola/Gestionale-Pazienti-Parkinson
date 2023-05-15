import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The FogsCollection. It encapsulates state and variable values for stuff.
 */
class FogsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'fogs';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      patient: String,
      distance: Number,
      frequency: Number,
      intensity: {
        type: Number,
        min: 1,
        max: 5,
      },
      episodedate: {
        type: Date,
        max: new Date(),
      },

    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
  }
}

/**
 * The singleton instance of the FogsCollection.
 * @type {FogsCollection}
 */
export const Fogs = new FogsCollection();
