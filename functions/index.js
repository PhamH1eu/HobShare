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
const getAllFriendsOfUser = require("./friend/getAllFriendsOfUser");
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
exports.getAllFriendsOfUser = getAllFriendsOfUser.getAllFriendsOfUser;

exports.createUserNode = createUserNode.createUserNode;

//TODO: When a group is created at groups/{groupId}, create a node group in neo4j

//TODO: When a document in groups/{groupId}/members/{memberId} is added, create a relationship user -> in -> group
//TODO: When a document in groups/{groupId}/members/{memberId} is removed, erase the relationship user -> in -> group

//TODO: When a post is created, if there is groupId then created a node Post with group -> have -> post, else create user -> write -> post, append post tags with image labels
//TODO: When a post is deleted, check groupId and delete in neo4j

//TODO: Sync user node with the liked property. This array contains activities



//TODO: Jaccard similarity between friends -> recommend group joined by friends ---- need to define which one to rec
//TODO: Jaccard similarity between users -> recommend friends to be added
//recommend posts...