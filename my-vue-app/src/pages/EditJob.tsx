import { FormRow, FormRowSelect, Submitbtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

export const action =
  (queryClient: any) =>
  async ({ request, params }: any) => {
    try {
      const formData = await request.formData();
      const payload = Object.fromEntries(formData);
      await customFetch.put(`/jobs/${params.id}`, payload);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["job", params.id]);
      toast.success("Job Updated Successfully ");
      return redirect("../alljobs");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return null;
    }
  };

const singleJobQuery = (id: string) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient: any) =>
  async ({ params }: any) => {
    try {
      await queryClient.ensureQueryData(singleJobQuery(params.id));
      return { id: params.id };
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      return redirect("/dashboard/alljobs");
    }
  };

const EditJob = () => {
  const { id }: any = useLoaderData();
  const {
    data: { job },
  } = useQuery(singleJobQuery(id));
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4>edit job</h4>
        <div className="form-center">
          <FormRow type="text" name={"position"} defaultValue={job.position} />
          <FormRow type="text" name={"company"} defaultValue={job.company} />
          <FormRow
            type="text"
            name={"jobLocation"}
            labelText="Job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText={"job status"}
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText={"job type"}
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <Submitbtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
