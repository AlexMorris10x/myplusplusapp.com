const mongoose = require("mongoose");
// const config = require("config");
const { PROJECT } = require("./server/db/project");

const data = [
  {
    value: "hi"
  },
  { username: "aaa" }
];

async function seed() {
  await mongoose.connect(config.get("mongodb://localhost/productivity-app"));
  for (let project of data) {
    const newProject = await new PROJECT(
      { value: project.value },
      { username: project.username }
    ).save;
    await PROJECT.insertMany(newProject);
  }
}
seed();
