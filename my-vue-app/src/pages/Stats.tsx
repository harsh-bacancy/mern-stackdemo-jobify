import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { StatsContainer, ChartContainer } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    console.log("🚀 ~ file: Stats.tsx:5 ~ loader ~ error:", error);
  }
};

const Stats = () => {
  const { defaultStats, monthlyApplications }: any = useLoaderData();
  return (
    <div>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </div>
  );
};

export default Stats;
