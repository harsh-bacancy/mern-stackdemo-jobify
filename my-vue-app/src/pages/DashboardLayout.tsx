import { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar, Loading } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

interface DashboardContextProps {
  user?: any;
  showSidebar?: boolean;
  isDarkTheme?: boolean;
  toggleDarkTheme?: () => void;
  logoutUser?: () => void;
  toggleSidebar?: () => void;
}
const DashboardContext = createContext<DashboardContextProps>({});

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    await queryClient.ensureQueryData(userQuery);
    return null;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = ({ queryClient }) => {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const isPageLoading = state === "loading";
  const { data } = useQuery(userQuery);
  const { user }: any = data;

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    setIsDarkTheme((preValue) => !preValue);
    document.body.classList.toggle("dark-theme", isDarkTheme);
    localStorage.setItem("darkTheme", isDarkTheme.toString());
  };
  const toggleSidebar = () => {
    setShowSidebar((preValue) => !preValue);
  };
  const logoutUser = async () => {
    try {
      const { data } = await customFetch.get("/auth/logout");
      queryClient.invalidateQueries();
      return data;
    } catch (error) {
      return error;
    } finally {
      toast.success("Logged out");
      navigate("/login");
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
