const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log("Connected to MongoDB");

  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Superman", email: "superman@example.com", age: 28, hobbies: ["reading"], bio: "developer", userId: "u001" },
    { name: "Batman",   email: "batman@example.com",   age: 35, hobbies: ["gaming"],  bio: "engineer",  userId: "u002" },
    { name: "Spiderman", email: "spiderman@example.com", age: 22, hobbies: ["reading"], bio: "designer",  userId: "u003" },
  ]);
  console.log("Data inserted\n");

  const col = mongoose.connection.db.collection("users");

  // Test 1 - name
  let r = await col.find({ name: "Alice" }).explain("executionStats");
  console.log("1. Name Index");
  console.log("   Keys Examined:", r.executionStats.totalKeysExamined);
  console.log("   Docs Examined:", r.executionStats.totalDocsExamined);
  console.log("   Time (ms):", r.executionStats.executionTimeMillis);

  // Test 2 - email + age
  r = await col.find({ email: "bob@example.com", age: 35 }).explain("executionStats");
  console.log("\n2. Email + Age Index");
  console.log("   Keys Examined:", r.executionStats.totalKeysExamined);
  console.log("   Docs Examined:", r.executionStats.totalDocsExamined);
  console.log("   Time (ms):", r.executionStats.executionTimeMillis);

  // Test 3 - hobbies
  r = await col.find({ hobbies: "reading" }).explain("executionStats");
  console.log("\n3. Hobbies Index");
  console.log("   Keys Examined:", r.executionStats.totalKeysExamined);
  console.log("   Docs Examined:", r.executionStats.totalDocsExamined);
  console.log("   Time (ms):", r.executionStats.executionTimeMillis);

  // Test 4 - userId
  r = await col.find({ userId: "u003" }).explain("executionStats");
  console.log("\n4. UserId Index");
  console.log("   Keys Examined:", r.executionStats.totalKeysExamined);
  console.log("   Docs Examined:", r.executionStats.totalDocsExamined);
  console.log("   Time (ms):", r.executionStats.executionTimeMillis);

  // Test 5 - bio text
  r = await col.find({ $text: { $search: "developer" } }).explain("executionStats");
  console.log("\n5. Bio Text Index");
  console.log("   Keys Examined:", r.executionStats.totalKeysExamined);
  console.log("   Docs Examined:", r.executionStats.totalDocsExamined);
  console.log("   Time (ms):", r.executionStats.executionTimeMillis);

  mongoose.disconnect();
});