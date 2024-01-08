import { FormRow, Submitbtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }: any) => {
    const formData = await request.formData();
    if (formData && formData.size > 500000) {
      toast.error("Image Size too large");
      return null;
    }
    try {
      queryClient.invalidateQueries(["user"]);
      await customFetch.patch("/users/update-user", formData);
      toast.success("User updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }

    return null;
  };

const Profile = () => {
  const { user }: any = useOutletContext();
  const { name, lastName, location, email } = user;
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (upto 0.5MB)
            </label>
            <input
              type={"file"}
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow type="text" name="lastName" defaultValue={lastName} />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <Submitbtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
