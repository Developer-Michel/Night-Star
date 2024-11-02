import { UserDataContext } from "@context/UserDataContext";
import { useContext } from "react";

export const useUserData = () => {
  const context = useContext(UserDataContext);
  return context;
};
