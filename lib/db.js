const admin = require("firebase-admin");
const assert = require("assert");

class DB {
  constructor(cert) {
    assert(cert, "Need a cert please");
    admin.initializeApp({
      credential: admin.credential.cert(cert),
    });

    this.fb = admin.firestore();
  }

  ref(collection) {
    return this.fb.collection(collection);
  }

  async exists(collection, key, val) {
    const snap = await this.fb
      .collection(collection)
      .where(key, "==", val)
      .get();
    return !snap.empty;
  }

  async orderBy(collection, key, dir = "asc", limit = 500) {
    assert(collection, "Need a collection please");
    assert(key, "Need key please");
    let out = [];
    const snap = await this.fb
      .collection(collection)
      .orderBy(key, dir)
      .limit(limit)
      .get();
    if (!snap.empty) {
      snap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        out.push(data);
      });
    }
    return out;
  }

  async get(collection, val) {
    assert(collection, "Need a collection please");
    assert(val, "Need val please");

    let out = null;
    const snap = await this.fb.collection(collection).doc(val.toString()).get();
    if (!snap.empty) {
      out = snap.data();
      if (!out) return null;
      out.id = snap.id;
    }
    return out;
  }

  async all(collection) {
    assert(collection, "Need a collection please");
    let out = [];
    const snap = await this.fb.collection(collection).get();
    if (!snap.empty) {
      snap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        out.push(data);
      });
    }
    return out;
  }

  async find(collection, key, val, limit = 500) {
    assert(collection, "Need a collection please");
    assert(key, "Need key please");
    assert(val, "Need val please");
    let out = [];
    const snap = await this.fb
      .collection(collection)
      .where(key, "==", val)
      .limit(limit)
      .get();
    if (!snap.empty) {
      snap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        out.push(data);
      });
    }
    return out;
  }

  async where(collection, key, op, val) {
    assert(collection, "Need a collection please");
    assert(key, "Need key please");
    assert(op, "Need op please");
    let out = [];
    const snap = await this.fb.collection(collection).where(key, op, val).get();
    if (!snap.empty) {
      snap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        out.push(data);
      });
    }
    return out;
  }

  async whereAnd(collection, wheres = [{ key, op, val }]) {
    let out = [];
    let query = this.fb.collection(collection);
    for (let { key, op, val } of wheres) {
      query = query.where(key, op, val);
    }
    const snap = await query.get();
    if (!snap.empty) {
      snap.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        out.push(data);
      });
    }
    return out;
  }

  async findOne(collection, key, val) {
    let out = null;
    const snap = await this.fb
      .collection(collection)
      .where(key, "==", val)
      .get();
    if (!snap.empty) {
      out = snap.docs[0].data();
      out.id = snap.docs[0].id;
    }
    return out;
  }

  async updateOne(collection, key, val) {
    assert(collection, "Need a collection please");
    assert(key, "Need key please");
    assert(val, "Need val please");
    return this.fb.collection(collection).doc(key).set(val, { merge: true });
  }

  async update(collection, id, doc) {
    assert(collection, "Need a collection please");
    assert(id, "Need id please");

    //check to ensure the id is a string
    if (typeof id !== "string") {
      id = id.toString();
    }

    await this.fb.collection(collection).doc(id).set(doc);
    return doc;
  }

  async add(collection, doc) {
    assert(collection, "Need a collection please");
    assert(doc, "Need doc please");
    const res = await this.fb.collection(collection).add(doc);
    doc.id = res.id;
    return doc;
  }

  async delete(collection, id) {
    assert(collection, "Need a collection please");
    assert(id, "Need id please");
    await this.fb.collection(collection).doc(id).delete();
    return true;
  }
}

exports.init = (config) => {
  return new DB(config);
};
