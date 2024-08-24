import { ActivitiesService } from "src/services/DatabaseService";
import { useQuery } from "react-query";

const useActivities = () => {
  const { data: activities, isLoading } = useQuery("activities", () =>
    ActivitiesService.query("type", "==", "starterKit")
  );

  return {
    activities,
    isLoading,
  };
};

export default useActivities;
