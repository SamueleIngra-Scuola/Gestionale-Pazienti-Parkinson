import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The MedicsCollection. It encapsulates state and variable values for stuff.
 */
class MedicsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'medics';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      username: String,
      password: String,
      name: String,
      surname: String,
      phone: String,
      birthday: Date,
      birthplace: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
  }
}

/**
 * The singleton instance of the MedicsCollection.
 * @type {MedicsCollection}
 */
export const Medics = new MedicsCollection();
