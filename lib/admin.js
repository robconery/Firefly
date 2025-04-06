const assert = require("assert");
const db = require("./db").init();
const Inflector = require("inflected");

const formattedTableName = (className) => {
  const underscored = Inflector.underscore(className);
  return Inflector.pluralize(underscored);
};

class Firefly {
  static async update(id, data) {
    return db.updateOne(formattedTableName(this.name), id, data);
  }
  static where(key, op, val) {
    return db.where(formattedTableName(this.name), key, op, val);
  }
  static async whereKeyExists(key) {
    return db.orderBy(formattedTableName(this.name), key);
  }
  static async create(args) {
    const newThing = new this(args);
    return newThing.save();
  }
  static async all() {
    return db.all(formattedTableName(this.name));
  }

  static async delete(id) {
    return db.delete(formattedTableName(this.name), id);
  }
  static async get(id) {
    const data = await db.get(formattedTableName(this.name), id);
    if (data) return new this(data);
    return null;
  }
  static async exists(id) {
    const data = await db.get(formattedTableName(this.name), id);
    return data !== null;
  }
  static async saveMany(docs = []) {
    const saved = [];
    for (let doc of docs) {
      const res = await doc.save();
      saved.push(res);
    }
    return saved;
  }
  static async find(criteria) {
    const key = Object.keys(criteria)[0];
    const val = Object.values(criteria)[0];
    const found = await db.findOne(formattedTableName(this.name), key, val);
    if (found) return new this(found);
    return null;
  }
  static async filter(criteria) {
    const key = Object.keys(criteria)[0];
    const val = Object.values(criteria)[0];
    let found = await db.find(formattedTableName(this.name), key, val);
    let out = [];
    for (let record of found) {
      out.push(new this(record));
    }
    return out;
  }
  static async deleteMany(criteria) {
    const key = Object.keys(criteria)[0];
    const val = Object.values(criteria)[0];
    const collection = formattedTableName(this.name);
    const found = await db.find(collection, key, val);
    let deleted = 0;
    for (let doc of found) {
      await db.delete(collection, doc.id);
      deleted++;
    }
    return deleted;
  }
  constructor(args) {
    //force the id assignment
    assert(args, "Can't save something without data");
    if (!args.id) {
      //create a random id 12 characters long
      args.id = Math.random().toString(36).substring(2, 14);
    } else {
      //ensure the id is a string
      args.id = args.id.toString;
    }
    Object.assign(this, args);
    this.created_at = args.created_at || new Date().toUTCString();
    this.timestamp = new Date().getTime();
  }
  //for testing mostly
  collection() {
    return formattedTableName(this.constructor.name);
  }
  async save() {
    let saved = null;
    //strip the class stuff
    const json = JSON.stringify(this);
    const data = JSON.parse(json);
    if (this.id) {
      saved = await db.update(this.collection(), this.id.toString(), data);
    } else {
      saved = await db.add(this.collection(), data);
    }

    return this;
  }
  delete() {
    return db.delete(this.collection(), this.id.toString());
  }
}

module.exports = Firefly;
