const assert = require("assert");
const Admin = require("../lib/admin"); // Adjust the path as necessary

class Bug extends Admin {}

describe("Firefly", () => {
  let bug = new Bug({ id: 1, name: "Steve", type: "moth" });

  it("should instantiate", () => {
    assert.ok(bug);
  });

  it("should create a document", async () => {
    bug = await bug.save();
    assert.ok(bug.id);
    assert.strictEqual(bug.name, "Steve");
  });

  it("should create nested document", async () => {
    let deepBug = new Bug({
      id: 1,
      name: "Steve",
      type: "moth",
      kids: [{ name: "Ray" }, { name: "Dolly" }],
    });
    await deepBug.save();
    assert.ok(deepBug.id);
    assert.strictEqual(deepBug.kids[0].name, "Ray");
    assert.strictEqual(deepBug.kids[1].name, "Dolly");
  });

  it("will save an array", async () => {
    let badBug = new Bug([1, 2, 3]);
    await badBug.save();
  });

  it("should find a document by ID", async () => {
    const result = await Bug.get(bug.id);
    assert.strictEqual(result.name, "Steve");
  });

  it("returns null if not found", async () => {
    const notFound = await Bug.get(999);
    assert.strictEqual(notFound, null);
  });

  it("should find a single document by criteria", async () => {
    const found = await Bug.find({ name: "Steve" });
    assert.strictEqual(found.name, "Steve");
  });

  it("should return null if criteria not matched", async () => {
    const found = await Bug.find({ name: "Ray" });
    assert.strictEqual(found, null);
  });
  it("should find a multiple documents by criteria using filter", async () => {
    const found = await Bug.filter({ name: "Steve" });
    assert.strictEqual(found.length, 1);
  });

  it("should return empty array if filter criteria not matched", async () => {
    const found = await Bug.filter({ name: "Ray" });
    assert.strictEqual(found.length, 0);
  });

  it("should find all documents", async () => {
    const results = await Bug.all();
    assert.ok(results.length > 0);
  });

  it("should delete a document and return true", async () => {
    const deleted = await bug.delete();
    assert(deleted);
  });
});
