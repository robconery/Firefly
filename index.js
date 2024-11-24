const admin = require("firebase-admin");
const cert = require("./admin_cert.json");
const assert = require("assert");
const Firefly = require("./firefly");


admin.initializeApp({
  projectId: "project-8588976765518720764",
  credential: admin.credential.cert(cert),
  storageBucket: "project-8588976765518720764.appspot.com"
});

const fb = admin.firestore();

exports.Firefly = Firefly;

exports.storage = admin.storage();

exports.auth = admin.auth();

exports.ref = function(collection){
  return fb.collection(collection); 
}

exports.exists = async function(collection,key,val){
  let out = null;
  const snap = await fb.collection(collection).where(key, "==", val).get()
  return !snap.empty;
}
exports.orderBy = async function(collection,key, dir="asc", limit=500){
  let out = [];
  const snap = await fb.collection(collection).orderBy(key, dir).limit(limit).get()
  if(!snap.empty){
    snap.forEach(doc => {
      let data = doc.data();
      data.id = doc.id;
      out.push(data)
    });
  }
  return out;
}

exports.get = async function(collection, val){
  let out = null;
  const snap = await fb.collection(collection).doc(val).get();
  if(!snap.empty){
    out = snap.data();
    if(!out) return null;
    out.id = snap.id;
  }
  return out;
}
exports.all = async function(collection){
  let out = [];
  const snap = await fb.collection(collection).get();
  if(!snap.empty){
    snap.forEach(doc => {
      let data = doc.data();
      data.id = doc.id;
      out.push(data)
    });
  }
  return out;
}

exports.find = async function(collection, key, val, limit=500){
  let out = [];
  const snap = await fb.collection(collection).where(key, "==", val).limit(limit).get();
  if(!snap.empty){
    snap.forEach(doc => {
      let data = doc.data();
      data.id = doc.id;
      out.push(data)
    });
  }
  return out;
}
exports.where = async function(collection, key, op, val){
  let out = [];
  const snap = await fb.collection(collection).where(key, op, val).get();
  if(!snap.empty){
    snap.forEach(doc => {
      let data = doc.data();
      data.id = doc.id;
      out.push(data)
    });
  }
  return out;
}
exports.whereAnd = async function(collection, wheres = [{key, op, val}]){
  let out = [];
  let query = fb.collection(collection);
  for(let {key, op, val} of wheres){
    console.log(key, op, val);
    query.where(key, op, val);
  }
  const snap = await query.get();
  if(!snap.empty){
    snap.forEach(doc => {
      let data = doc.data();
      data.id = doc.id;
      out.push(data)
    });
  }
  return out;
}

exports.findOne = async function(collection, key, val){
  let out = null;
  const snap = await fb.collection(collection).where(key, "==", val).get();
  if(!snap.empty){
    out = snap.docs[0].data();
    out.id = snap.docs[0].id;
  }
  return out;
}

exports.updateOne = async function(collection, key, val){
  assert(collection, "Need a collection please")
  assert(key, "Need key please")
  assert(val, "Need val please")
  return fb.collection(collection).doc(key).set(val, {merge: true})
}

exports.create = async function(collection, id, doc){
  assert(collection, "Need a collection please")
  assert(id, "Need id please")
  await fb.collection(collection).doc(id).set(doc);
  return doc;
}
exports.add = async function(collection, doc){
  assert(collection, "Need a collection please")
  assert(doc, "Need doc please")
  const res = await fb.collection(collection).add(doc);
  doc.id = res.id;
  return doc;
}

exports.delete = async function(collection, id){
  assert(collection, "Need a collection please")
  assert(id, "Need id please")
  const res = await fb.collection(collection).doc(id).delete();
  return true;
}

exports.db = fb;
