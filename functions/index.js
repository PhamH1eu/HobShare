const admin = require("firebase-admin");
const onPostCreated = require("./onPostCreated");

admin.initializeApp();

exports.onPostCreated = onPostCreated.onPostCreated;
