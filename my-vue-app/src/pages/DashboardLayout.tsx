import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

interface DashboardContextProps {
  user?: any;
  showSidebar?: boolean;
  isDarkTheme?: boolean;
  toggleDarkTheme?: () => void;
  logoutUser?: () => void;
  toggleSidebar?: () => void;
}
const DashboardContext = createContext<DashboardContextProps>({});

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user }: any = useLoaderData();
  //temp data

  // const user = { name: "Raja" };
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
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;