import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { LINKS_PER_PAGE } from "../../src/utils";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://react-firebase-news.firebaseio.com"
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/linksPagination?
//
export const linksPagination = functions.https.onRequest(
  (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    let linksRef = db.collection("links");
    const offset = Number(request.query.offset);
    linksRef
      .orderBy("created", "desc")
      .limit(LINKS_PER_PAGE)
      .offset(offset)
      .get()
      .then(snapshot => {
        const links = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        response.json(links);
      });
  }
);
