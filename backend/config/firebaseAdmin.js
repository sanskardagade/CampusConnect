var admin = require("firebase-admin");
var serviceAccount = require("../secure/faculty-tracker-30135-firebase-adminsdk-j1nux-393f78344a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://faculty-tracker-30135-default-rtdb.firebaseio.com"
});

const fb = admin.database();
module.exports = fb;