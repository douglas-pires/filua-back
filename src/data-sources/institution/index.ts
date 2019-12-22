import DataSourceMongo from '../base';
import Institution from 'src/db/schema/institution';

export default class InstitutionDataSource extends DataSourceMongo {
  getInstitutions() {
    return this.find();
  }

  addInstitution(input) {
    const { name, about, accounts } = input;

    const institution = new Institution({
      name,
      about,
      accounts,
    });

    return this.save(institution);
  }

  removeInstitution(input) {
    const { id } = input;

    return this.deleteOne({ _id: id });
  }

  updateInstitution(input) {
    const { id, name, about, accounts } = input;

    return this.updateOne(
      { _id: id },
      {
        name,
        about,
        accounts,
      },
    );
  }
}
