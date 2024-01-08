import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.log("🚀 ~ file: ErrorElement.tsx:5 ~ ErrorElement ~ error:", error);
  return <div>There was an errorss</div>;
};

export default ErrorElement;
