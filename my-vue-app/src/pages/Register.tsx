import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, Submitbtn } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successfull");
    return redirect("/login");
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type={"text"} name={"name"} defaultValue={"Raja"} required />
        <FormRow
          type={"text"}
          name={"lastName"}
          // labelText={"Last Name"}
          defaultValue={"Kumar"}
          required
        />
        <FormRow
          type={"text"}
          name={"location"}
          // defaultValue={"Patna"}
          required
        />
        <FormRow
          type={"email"}
          name={"email"}
          // defaultValue={"raja@gmail.com"}
          required
        />
        <FormRow
          type={"password"}
          name={"password"}
          // defaultValue={"admin@123"}
          required
        />
        <Submitbtn />
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
