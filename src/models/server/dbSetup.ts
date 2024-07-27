import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database connected");
  } catch (error) {
    try {
      const data = await databases.create(db, db);
      console.log("Database created");
      const colle = await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Colleaction created         ", colle);
      console.log("database connected           ", data);
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }
  return databases;
}
