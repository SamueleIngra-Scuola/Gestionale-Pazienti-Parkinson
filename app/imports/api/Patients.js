import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The PatientsCollection. It encapsulates state and variable values for stuff.
 */
class PatientsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'patients';
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
      assistedBy: {
        type: String,
        optional: true,
      },
      authToken: {
        type: String,
        optional: true,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
  }
}

/**
 * The singleton instance of the PatientsCollection.
 * @type {PatientsCollection}
 */
export const Patients = new PatientsCollection();
