import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient: any) =>
  async ({ params }: any) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job deleted successfully");
      return redirect("/dashboard/alljobs");
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    } finally {
    }
  };
