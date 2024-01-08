import {
  Form,
  useNavigation,
  redirect,
  useOutletContext,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient: any) =>
  async ({ request }: any) => {
    try {
      const formData = await request.formData();
      const payload = Object.fromEntries(formData);
      await customFetch.post("/jobs", payload);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job added successfully");
      return redirect("alljobs");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const AddJob = () => {
  const { user }: any = useOutletContext();
  const navigation = useNavigation();
  const isSumbitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" name="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={user.location}
          />

          <FormRowSelect
            name={"jobStatus"}
            labelText={"Job Status"}
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
            key={"jobStatus"}
          />
          <FormRowSelect
            name={"jobType"}
            labelText={"Job Type"}
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
            key={"jobType"}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSumbitting}
          >
            {isSumbitting ? "submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
