import { ActivitiesService } from "src/services/DatabaseService";
import { useQuery } from "react-query";

const useAllActivities = () => {
  const { data: activities, isLoading } = useQuery("activities", () =>
    ActivitiesService.getAll()
  );

  return {
    activities,
    isLoading,
  };
};

export default useAllActivities;
