const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Cloud Function to send a friend request with sender's avatar and name
exports.sendFriendRequest = functions.https.onCall(async (data, context) => {
    // Ensure the request is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Request must be authenticated.');
    }

    const fromUserId = context.auth.uid;  // The authenticated user (sender)
    const toUserId = data.toUserId;       // The recipient of the friend request

    // Firestore references
    const db = admin.firestore();
    const fromUserRef = db.collection('users').doc(fromUserId);
    const toUserRef = db.collection('users').doc(toUserId);

    try {
        // Fetch the sender's profile information (avatar and name)
        const fromUserSnapshot = await fromUserRef.get();
        if (!fromUserSnapshot.exists) {
            throw new functions.https.HttpsError('not-found', 'Sender not found.');
        }
        
        const fromUserData = fromUserSnapshot.data();
        const senderName = fromUserData.name || 'Unknown';    // Ensure there's a default value
        const senderAvatar = fromUserData.avatar || '';       // Optional avatar field

        // Check if a request already exists (in the recipient's collection)
        const existingRequestSnapshot = await toUserRef.collection('friendRequests')
            .doc(fromUserId).get();

        if (existingRequestSnapshot.exists) {
            throw new functions.https.HttpsError('already-exists', 'Friend request already sent.');
        }

        // Batch operation to ensure both writes happen atomically
        const batch = db.batch();

        // Add the friend request to the recipient's friendRequests subcollection with sender's info
        const recipientRequestRef = toUserRef.collection('friendRequests').doc(fromUserId);  // Use senderId as doc ID
        batch.set(recipientRequestRef, {
            from: fromUserId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(), // Add timestamp
            senderName,  // Add sender's name
            senderAvatar // Add sender's avatar
        });

        // Add the friend request to the sender's sentRequests subcollection with receiver's info
        const sentRequestRef = fromUserRef.collection('sentRequests').doc(toUserId);  // Use receiverId as doc ID
        batch.set(sentRequestRef, {
            to: toUserId,
            timestamp: admin.firestore.FieldValue.serverTimestamp() // Add timestamp
        });

        // Commit the batch operation
        await batch.commit();

        console.log(`Friend request sent from ${fromUserId} to ${toUserId}`);
        return { success: true, message: 'Friend request sent successfully.' };

    } catch (error) {
        console.error('Error sending friend request:', error);
        throw new functions.https.HttpsError('internal', 'Unable to send friend request.');
    }
});
