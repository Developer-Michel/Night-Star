import { Footer } from "@component/footer/Footer";
import { Header } from "@component/header/Header";
import { PageType } from "@component/side-bar/Types";
import { ReactNode, useState } from "react";
import { LayoutContext } from "./LayoutContext";
import { useRecoilValue } from "recoil";
import { selectedUserAtom } from "@recoil/atom";
import { SideBarControllerProvider } from "./SidebarControllerProvider";
export const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPage, setSelectedPage] = useState<PageType>(PageType.home);
  const selectedUser = useRecoilValue(selectedUserAtom);
  return (
    <LayoutContext.Provider
      value={{
        selectedPage,
        setSelectedPage
      }}>
      <div className={`layout ${selectedUser?.UserName}`}>
        <div id="background" className="background">
          <img src={`/assets/YingYang.png`} />
        </div>
        <SideBarControllerProvider>
          <Header></Header>
          <div className="main-container">{children}</div>
          <Footer></Footer>
        </SideBarControllerProvider>
      </div>
    </LayoutContext.Provider>
  );
};
