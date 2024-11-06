import { Header } from "@component/header/Header";
import { PageType } from "@component/side-bar/Types";
import { ReactNode, useRef, useState } from "react";
import { LayoutContext } from "./LayoutContext";
import { useRecoilValue } from "recoil";
import { selectedUserAtom } from "@recoil/atom";
import { SideBarControllerProvider } from "./SidebarControllerProvider";
export const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPage, setSelectedPage] = useState<PageType>(PageType.home);
  const selectedUser = useRecoilValue(selectedUserAtom);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <LayoutContext.Provider
      value={{
        selectedPage,
        setSelectedPage
      }}>
      <div className={`layout ${selectedUser?.UserName}`}>
        <div ref={backgroundRef} id="background" className="background">
          <img src={`/assets/YingYang.png`} />
        </div>
        <SideBarControllerProvider>
          <Header></Header>
          <div ref={containerRef} className="main-container">
            {children}
          </div>
          {/* <Footer></Footer> */}
        </SideBarControllerProvider>
      </div>
    </LayoutContext.Provider>
  );
};
