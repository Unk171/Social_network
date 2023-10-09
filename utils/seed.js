const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const usersData = [
    {
      userName: "user1",
      email: "user1@example.com",
    },
    {
      userName: "user2",
      email: "user2@example.com",
    },
    {
      userName: "user3",
      email: "user3@example.com",
    },
    {
      userName: "user4",
      email: "user4@example.com",
    },
    {
      userName: "user5",
      email: "user5@example.com",
    },
  ];

  const thoughtsData = [
    {
      thoughtText: "Just had a great cup of coffee!",
      username: "user1",
      reactions: [
        { reactionText: "That's awesome!", username: "user2" },
        { reactionText: "I need one too!", username: "user3" },
      ],
    },
    {
      thoughtText: "Exploring a new hiking trail today.",
      username: "user4",
      reactions: [],
    },
    {
      thoughtText: "Finished reading a fantastic book.",
      username: "user5",
      reactions: [{ reactionText: "What's the title?", username: "user1" }],
    },
    {
      thoughtText: "Trying out a new recipe for dinner.",
      username: "user2",
      reactions: [],
    },
    {
      thoughtText: "Enjoying the sunset at the beach.",
      username: "user3",
      reactions: [{ reactionText: "Sounds magical!", username: "user4" }],
    },
    {
      thoughtText: "Attending a music concert tonight!",
      username: "user1",
      reactions: [],
    },
    {
      thoughtText: "Working on a coding project.",
      username: "user5",
      reactions: [],
    },
    {
      thoughtText: "Learning a new language is challenging.",
      username: "user4",
      reactions: [
        { reactionText: "Keep going, you can do it!", username: "user2" },
      ],
    },
    {
      thoughtText: "Celebrating my birthday today!",
      username: "user3",
      reactions: [{ reactionText: "Happy Birthday!", username: "user1" }],
    },
    {
      thoughtText: "Gardening is my favorite hobby.",
      username: "user2",
      reactions: [],
    },
  ];

  await User.collection.insertMany(usersData);
  await Thought.collection.insertMany(thoughtsData);

  console.table(usersData);
  console.table(thoughtsData);
  console.info("Seeding complete!");
  process.exit(0);
});
