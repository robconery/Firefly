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

  it("should find a document by ID", async () => {
    const result = await Bug.get(bug.id);
    assert.strictEqual(result.name, "Steve");
  });

  it("returns null if not found", async () => {
    const notFound = await Bug.get(999);
    assert.strictEqual(notFound, null);
  });

  it("should find documents by criteria", async () => {
    const found = await Bug.find({ name: "Steve" });
    assert.strictEqual(found.name, "Steve");
  });

  it("should find all documents", async () => {
    const results = await Bug.all();
    assert.ok(results.length > 0);
  });

  it("should delete a document", async () => {
    const deleted = await bug.delete();
    assert(deleted);
  });
});
