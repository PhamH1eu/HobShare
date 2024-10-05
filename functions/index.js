const admin = require("firebase-admin");

const onGroupCreated = require("./group/onGroupCreated");
const onMemberJoined = require("./group/onMemberJoined");
const onMemberLeft = require("./group/onMemberLeft");

const onPostCreated = require("./post/onPostCreated");
const onPostDeleted = require("./post/onPostDeleted");
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
const onUserUpdateActivity = require("./user/onUserUpdateActivity");

const getUserGroupPosts = require("./recommend/getUserGroupPosts");
const findSimilarUsers = require("./recommend/findSimilarUsers");
const recommendedGroups = require("./recommend/recommendGroups");

admin.initializeApp();

exports.sendUserNotification = sendUserNotification.sendUserNotification;
exports.updateDocumentWithLabels = updateDocumentWithLabels.updateDocumentWithLabels;

exports.onPostCreated = onPostCreated.onPostCreated;
exports.onPostDeleted = onPostDeleted.onPostDeleted;
exports.countHashtagPosts = countHashtagPosts.countHashtagPosts;

exports.sendFriendRequest = sendFriendRequest.sendFriendRequest;
exports.cancelFriendRequest = cancelFriendRequest.cancelFriendRequest;
exports.acceptFriendRequest = acceptFriendRequest.acceptFriendRequest;
exports.removeFriend = removeFriend.removeFriend;
exports.getAllFriends = getAllFriends.getAllFriends;
exports.denyFriendRequest = denyFriendRequest.denyFriendRequest;
exports.getAllFriendsOfUser = getAllFriendsOfUser.getAllFriendsOfUser;

exports.onGroupCreated = onGroupCreated.onGroupCreated;
exports.onMemberJoined = onMemberJoined.onMemberJoined;
exports.onMemberLeft = onMemberLeft.onMemberLeft;

exports.createUserNode = createUserNode.createUserNode;
exports.onUserUpdateActivity = onUserUpdateActivity.onUserUpdateActivity;

exports.getUserGroupPosts = getUserGroupPosts.getUserGroupPosts;
exports.findSimilarUsers = findSimilarUsers.findSimilarUsers;
exports.recommendedGroups = recommendedGroups.recommendGroups;