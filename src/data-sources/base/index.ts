import { Collection, Document } from 'mongoose';
import { DataSource } from 'apollo-datasource';

export default class DataSourceMongo extends DataSource {
  constructor(private collection: Collection) {
    super();
  }

  protected findOne(id) {
    return this.collection.findOne({ _id: id });
  }

  protected find(query?) {
    return this.collection.find(query);
  }

  protected save(document: Document, callback?) {
    return this.collection.save(document, callback);
  }

  protected updateOne(filter, update, callback?) {
    return this.collection.updateOne(filter, update, callback);
  }

  protected deleteOne(filter) {
    return this.collection.deleteOne(filter);
  }
}
