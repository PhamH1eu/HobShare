const admin = require("firebase-admin");

const onGroupCreated = require("./group/onGroupCreated");
const onMemberJoined = require("./group/onMemberJoined");
const onMemberLeft = require("./group/onMemberLeft");
const onAdminUpdated = require("./group/onAdminUpdated");
const onGroupDeleted = require("./group/onGroupDeleted");

const onPostCreated = require("./post/onPostCreated");
const onPostDeleted = require("./post/onPostDeleted");
const onCommentAdded = require("./post/onCommentAdded");
const onCommentDeleted = require("./post/onCommentDeleted");
const onPostLiked = require("./post/onPostLiked");
const onLikeDeleted = require("./post/onLikeDeleted");
const countHashtagPosts = require("./post/countHashtagPosts");
const onScheduledTimeDecay = require("./post/onScheduledTimeDecay");

const sendUserNotification = require("./util/sendUserNotification");
const updateDocumentWithLabels = require("./util/updateDocumentWithLabels");

const sendFriendRequest = require("./friend/sendFriendRequest");
const cancelFriendRequest = require("./friend/cancelFriendRequest");
const acceptFriendRequest = require("./friend/acceptRequest");
const removeFriend = require("./friend/removeFriend");
const getAllFriends = require("./friend/getAllFriends");
const denyFriendRequest = require("./friend/denyFriendRequest");
const getAllFriendsOfUser = require("./friend/getAllFriendsOfUser");
const getCommonFriendsCount = require("./friend/getCommonFriends");

const createUserNode = require("./user/createUserNeo4j");
const onUserUpdateActivity = require("./user/onUserUpdateActivity");

const getFriendPosts = require("./recommend/getFriendPosts");
const getUserGroupPosts = require("./recommend/getUserGroupPosts");
const findSimilarUsers = require("./recommend/findSimilarUsers");
const recommendedGroups = require("./recommend/recommendGroups");
const recommendedPostsByAffinity = require("./recommend/recommendPostsByAffinity");
const recommendedPostsByEmbedding = require("./recommend/recommendPostsByEmbedding");

admin.initializeApp();

exports.sendUserNotification = sendUserNotification.sendUserNotification;
exports.updateDocumentWithLabels = updateDocumentWithLabels.updateDocumentWithLabels;

exports.onPostCreated = onPostCreated.onPostCreated;
exports.onPostDeleted = onPostDeleted.onPostDeleted;
exports.onCommentAdded = onCommentAdded.onCommentAdded;
exports.onPostLiked = onPostLiked.onPostLiked;
exports.countHashtagPosts = countHashtagPosts.countHashtagPosts;
exports.onLikeDeleted = onLikeDeleted.onLikeDeleted;
exports.onCommentDeleted = onCommentDeleted.onCommentDeleted;
exports.onScheduledTimeDecay = onScheduledTimeDecay.onScheduledTimeDecay;

exports.sendFriendRequest = sendFriendRequest.sendFriendRequest;
exports.cancelFriendRequest = cancelFriendRequest.cancelFriendRequest;
exports.acceptFriendRequest = acceptFriendRequest.acceptFriendRequest;
exports.removeFriend = removeFriend.removeFriend;
exports.getAllFriends = getAllFriends.getAllFriends;
exports.denyFriendRequest = denyFriendRequest.denyFriendRequest;
exports.getAllFriendsOfUser = getAllFriendsOfUser.getAllFriendsOfUser;
exports.getCommonFriendsCount = getCommonFriendsCount.getCommonFriendsCount;

exports.onGroupCreated = onGroupCreated.onGroupCreated;
exports.onMemberJoined = onMemberJoined.onMemberJoined;
exports.onMemberLeft = onMemberLeft.onMemberLeft;
exports.onAdminUpdated = onAdminUpdated.onAdminUpdated;
exports.onGroupDeleted = onGroupDeleted.onGroupDeleted;

exports.createUserNode = createUserNode.createUserNode;
exports.onUserUpdateActivity = onUserUpdateActivity.onUserUpdateActivity;

exports.getFriendPosts = getFriendPosts.getFriendPosts;
exports.getUserGroupPosts = getUserGroupPosts.getUserGroupPosts;
exports.findSimilarUsers = findSimilarUsers.findSimilarUsers;
exports.recommendedGroups = recommendedGroups.recommendGroups;
exports.recommendedPostsByAffinity = recommendedPostsByAffinity.recommendPostsByAffinity;
exports.recommendedPostsByEmbedding = recommendedPostsByEmbedding.recommendPostsByEmbedding;