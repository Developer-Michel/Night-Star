import { atom } from "recoil";
import { UserDto } from "types/Types";

export const selectedUserAtom = atom<UserDto | null>({
  key: "selectedUser", // unique ID (with respect to other atoms/selectors)
  default: null // initial value
});
