import { Document, Model } from 'mongoose';
import { DataSource } from 'apollo-datasource';

export default class DataSourceMongo extends DataSource {
  constructor(private model: Model<any>) {
    super();
  }

  protected findOne(id) {
    return this.model.findOne({ _id: id });
  }

  protected async findBy(filter) {
    return this.model.findOne(filter);
  }

  protected async find({ first, after } = { first: 24, after: null }) {
    let options = null;
    if (after) options = { _id: { $gt: after } };
    return this.model.find(options).limit(first);
  }

  protected save(document: Document) {
    return document.save();
  }

  protected updateOne(filter, update, callback?) {
    return this.model.updateOne(filter, update, callback);
  }

  protected deleteOne(filter) {
    return this.model.deleteOne(filter);
  }
}
