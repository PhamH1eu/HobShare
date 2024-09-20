import { getToken } from "firebase/messaging";
import { messaging } from "src/lib/firebase";
import { UserService } from "./DatabaseService";

export const updateUserToken = async (currentUserId) => {
  const token = await getToken(messaging, {
    vapidKey:
      "BMJpJFxVk_jJtbT62xlYvlEgFAyyYqX00xL6F-ZOlj_ON-Hr8Ri0D8Wvp_EkjclMLPdqmlori77fUNC8neKUOCk",
  });
  if (token) {
    await UserService.update(currentUserId, {
      receiverToken: token,
    });
  }
  console.log(token);
};
