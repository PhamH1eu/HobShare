const admin = require("firebase-admin");

const onPostCreated = require("./post/onPostCreated");
const countHashtagPosts = require("./post/countHashtagPosts");
const sendUserNotification = require("./util/sendUserNotification");
const updateDocumentWithLabels = require("./util/updateDocumentWithLabels");
const sendFriendRequest = require("./friend/sendFriendRequest");
const cancelFriendRequest = require("./friend/cancelFriendRequest");
const acceptFriendRequest = require("./friend/acceptRequest");
const removeFriend = require("./friend/removeFriend");
const getAllFriends = require("./friend/getAllFriends");
const denyFriendRequest = require("./friend/denyFriendRequest");
const createUserNode = require("./user/createUserNeo4j");

admin.initializeApp();

exports.sendUserNotification = sendUserNotification.sendUserNotification;
exports.updateDocumentWithLabels = updateDocumentWithLabels.updateDocumentWithLabels;

exports.onPostCreated = onPostCreated.onPostCreated;
exports.countHashtagPosts = countHashtagPosts.countHashtagPosts;

exports.sendFriendRequest = sendFriendRequest.sendFriendRequest;
exports.cancelFriendRequest = cancelFriendRequest.cancelFriendRequest;
exports.acceptFriendRequest = acceptFriendRequest.acceptFriendRequest;
exports.removeFriend = removeFriend.removeFriend;
exports.getAllFriends = getAllFriends.getAllFriends;
exports.denyFriendRequest = denyFriendRequest.denyFriendRequest;

exports.createUserNode = createUserNode.createUserNode;