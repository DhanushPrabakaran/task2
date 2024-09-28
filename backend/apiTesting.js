const newman = require("newman");
newman.run(
  {
    collection: require("./test/task2ApiTesting.postman_collection.json"),
    reporters: ["cli", "html"],
  },
  process.exit
);
