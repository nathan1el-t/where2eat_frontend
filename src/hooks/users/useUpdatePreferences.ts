import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../auth/useAxiosPrivate";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import type { UpdatePreferencesInput } from "@/shared/schemas/UpdatePreferencesSchema";

export const useUpdateUserPreferences = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationFn: async (data: UpdatePreferencesInput) => {
      const res = await axiosPrivate.patch("/users/me/preferences", data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      showNotification({
        title: "Preferences updated",
        message: "Your preferences are successfully updated",
        color: "green",
      });

      queryClient.invalidateQueries({ queryKey: ['smartRecommendations'] });
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message: string }>;

      showNotification({
        title: "Update failed",
        message:
          err?.response?.data?.message ||
          "Error updating preferences. Please try again",
        color: "red",
      });
      console.error("Update Preferences failed:", error);
    },
  });
};
