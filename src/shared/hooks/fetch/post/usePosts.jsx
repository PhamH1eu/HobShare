import { httpsCallable } from "firebase/functions";
import { useQueries } from "react-query";
import { functions } from "src/lib/firebase";

function mixArrays(array1, array2) {
  const result = [];
  const seen = new Set(); // To track IDs that are already in the result array
  const length1 = array1.length;
  const length2 = array2.length;

  let i = 0;
  let j = 0;

  // Loop until both arrays are exhausted
  while (i < length1 || j < length2) {
    if (i < length1 && !seen.has(array1[i])) {
      // Add only if not seen
      result.push(array1[i]);
      seen.add(array1[i]); // Mark this ID as seen
      i++;
    }

    if (j < length2 && !seen.has(array2[j])) {
      // Add only if not seen
      result.push(array2[j]);
      seen.add(array2[j]); // Mark this ID as seen
      j++;
    }
  }

  return result;
}

const usePosts = () => {
  const [postByEmbeddingQuery, postByAffinityQuery] = useQueries([
    {
      queryKey: "postsByEmbedding",
      queryFn: () => {
        const findPosts = httpsCallable(
          functions,
          "recommendedPostsByEmbedding"
        );
        return findPosts().then((result) => result.data);
      },
    },
    {
      queryKey: "postsByAffinity",
      queryFn: () => {
        const findPosts = httpsCallable(
          functions,
          "recommendedPostsByAffinity"
        );
        return findPosts().then((result) => result.data);
      },
    },
  ]);

  const posts = mixArrays(
    postByEmbeddingQuery.data || [],
    postByAffinityQuery.data || []
  );

  return {
    posts,
    isLoading: false,
  };
};

export default usePosts;
