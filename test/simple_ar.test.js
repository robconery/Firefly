const Admin = require("../lib/admin");

class Bug extends Admin {}

describe("Firefly ActiveRecord API", () => {
  let bug = new Bug({ id: 1, name: "Steve", type: "moth" });

  it("instantiates", () => {
    expect(bug).toBeTruthy();
  });

  it("creates a document", async () => {
    bug = await bug.save();
    expect(bug.id).toBeTruthy();
    expect(bug.name).toBe("Steve");
  });

  it("creates nested document", async () => {
    let deepBug = new Bug({
      id: 1,
      name: "Steve",
      type: "moth",
      kids: [{ name: "Ray" }, { name: "Dolly" }],
    });
    await deepBug.save();
    expect(deepBug.id).toBeTruthy();
    expect(deepBug.kids[0].name).toBe("Ray");
    expect(deepBug.kids[1].name).toBe("Dolly");
  });

  it("will save an array", async () => {
    let badBug = new Bug([1, 2, 3]);
    await expect(badBug.save()).resolves.not.toThrow();
  });

  it("finds a document by ID using get", async () => {
    const result = await Bug.get(bug.id);
    expect(result.name).toBe("Steve");
  });

  it("returns null if not found with get", async () => {
    const notFound = await Bug.get(999);
    expect(notFound).toBeNull();
  });

  it("finds a single document by criteria using find", async () => {
    const found = await Bug.find({ name: "Steve" });
    expect(found.name).toBe("Steve");
  });

  it("returns null if criteria not matched using find", async () => {
    const found = await Bug.find({ name: "Ray" });
    expect(found).toBeNull();
  });

  it("finds multiple documents by criteria using filter", async () => {
    const found = await Bug.filter({ name: "Steve" });
    expect(found).toHaveLength(1);
  });

  it("returns empty array if filter criteria not matched", async () => {
    const found = await Bug.filter({ name: "Ray" });
    expect(found).toHaveLength(0);
  });

  it("finds all documents using all", async () => {
    const results = await Bug.all();
    expect(results.length).toBeGreaterThan(0);
  });

  it("deletes a document and returns true using delete", async () => {
    const deleted = await bug.delete();
    expect(deleted).toBe(true);
  });
});
