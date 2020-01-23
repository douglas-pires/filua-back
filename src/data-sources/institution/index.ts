import DataSourceMongo from '../base';
import Institution from '../../db/schema/institution';

export default class InstitutionDataSource extends DataSourceMongo {
  getInstitutions() {
    return this.find();
  }

  getInstitutionByName(name) {
    return this.findBy({ name });
  }

  getOneInstitution(input) {
    const { id } = input;
    return this.findOne({ _id: id });
  }

  addInstitution(input) {
    const { name, about, accounts, image } = input;

    const institution = new Institution({
      name,
      about,
      image,
      accounts,
    });

    return this.save(institution);
  }

  removeInstitution(input) {
    const { id } = input;

    return this.deleteOne({ _id: id });
  }

  updateInstitution(input) {
    const { id, name, about, accounts, image } = input;

    return this.updateOne(
      { _id: id },
      {
        name,
        about,
        accounts,
        image,
      },
    );
  }
}
