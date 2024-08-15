import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "src/lib/firebase";
import { timeDiff } from "src/shared/helper/timeDiff";

const useListenOnline = (contactId) => {
  const [online, setOnline] = useState(false);
  const [timeOff, setTimeoff] = useState();

  useEffect(() => {
    const unSub = onValue(ref(database, `status/${contactId}`), (snapshot) => {
      const data = snapshot.val();
      data.state === "online" ? setOnline(true) : setOnline(false);
      // @ts-ignore
      setTimeoff(timeDiff(data.last_changed));
    });

    return () => unSub();
  }, [contactId]);

  return { online, timeOff };
};

export default useListenOnline;
