import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      <div>
        {!isDarkTheme ? (
          <BsFillSunFill className={"toggle-icon"} />
        ) : (
          <BsFillMoonFill />
        )}
      </div>
    </Wrapper>
  );
};

export default ThemeToggle;
