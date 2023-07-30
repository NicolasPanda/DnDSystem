class BasicController {
  constructor(Model) {
    this.Model = Model;
  }

  getInitItems = async () => {
    try {
      const items = await this.Model.find();
      return items;
    } catch (error) {
      throw error;
    }
  };

  addItem = async (change) => {
    try {
      const item = new this.Model(change);
      await item.save();
      return item;
    } catch (error) {
      throw error;
    }
  };

  editItem = async (change, id) => {
    try {
      const item = await this.Model.findByIdAndUpdate(id, change, {
        new: true,
      });
      return item;
    } catch (error) {
      throw error;
    }
  };

  deleteItem = async (id) => {
    try {
      const item = await this.Model.findByIdAndDelete(id);
      return item;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = BasicController;
