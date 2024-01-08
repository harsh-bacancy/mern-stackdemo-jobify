import { Form, redirect, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, Submitbtn } from "../components";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient: any) =>
  async ({ request }: any) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("Login successfull");
      return redirect("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@gmail.com",
      password: "admin@123",
    };
    try {
      await customFetch.post("/auth/login", data);
      navigate("/dashboard");
      toast.success("Take test drive");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow
          type={"email"}
          name={"email"}
          // defaultValue={"admin@gmail.com"}
          required
        />
        <FormRow
          type={"password"}
          name={"password"}
          // defaultValue={"admin@123"}
          required
        />
        <Submitbtn />
        <button
          type={"button"}
          className="btn btn-block"
          onClick={loginDemoUser}
        >
          Explore the app
        </button>
        <p>
          Not a member Yet??
          <Link to={"/register"} className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
