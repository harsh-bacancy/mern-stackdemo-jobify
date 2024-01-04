import { FormRow, FormRowSelect, Submitbtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request, params }: any) => {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData);
    await customFetch.put(`/jobs/${params.id}`, payload);
    toast.success("Job Updated Successfully ");
    return redirect("../alljobs");
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return null;
  }
};

export const loader = async ({ params }: any) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (err: any) {
    toast.error(err?.response?.data?.message);
    return redirect("/dashboard/alljobs");
  }
};

const EditJob = () => {
  const { job }: any = useLoaderData();

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
