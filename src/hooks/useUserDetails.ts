import { useGetSingleUserQuery } from "../redux/features/user/userApi";

// Custom hook to get user details
const useUserDetails = (id: any) => {
  const { data: replyUser, error, isLoading } = useGetSingleUserQuery(id);

  // Return the states and data from the hook
  return { loading: isLoading, data: replyUser, error };
};

export default useUserDetails;
