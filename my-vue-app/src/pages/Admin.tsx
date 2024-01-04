import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const res = await customFetch.get("/users/admin/app-stats");
    return res.data;
  } catch (error: any) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs }: any = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title={"Current Users"}
        count={users}
        color={"#e9b949"}
        bcg={"#fcefc7"}
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title={"Total jobs"}
        count={jobs}
        color={"#6478cb"}
        bcg={"#e0e8f9"}
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
