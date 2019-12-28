import { Document, Model } from 'mongoose';
import { DataSource } from 'apollo-datasource';

export default class DataSourceMongo extends DataSource {
  constructor(private model: Model<any>) {
    super();
  }

  protected findOne(id) {
    return this.model.findOne({ _id: id });
  }

  protected async find() {
    return this.model.find({});
  }

  protected save(document: Document, callback?) {
    return this.model.findOneAndUpdate(document, callback);
  }

  protected updateOne(filter, update, callback?) {
    return this.model.updateOne(filter, update, callback);
  }

  protected deleteOne(filter) {
    return this.model.deleteOne(filter);
  }
}
