import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const isEqual = await bcrypt.compare(password, hashedPassword);
  return isEqual;
};
export { hashPassword, comparePassword };
