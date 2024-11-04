import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSideBar } from "@hooks/useSideBar";
import { PageIconMap, PageType, SideBarNavElement } from "./Types";
import { useLayout } from "@hooks/useLayout";

export function SidebarLeftPart() {
  const { selectedPage } = useLayout();
  const { changeIcon } = useSideBar();

  return (
    <div className="sidebar-left">
      <div className="sidebar-nav">
        <ul className="reduced-scroller">
          {Object.values(PageType)
            .filter((x) => x != "NOTIFICATION" && x != "PROFILE")
            .map((x, i) => {
              return (
                <li
                  data-tooltip-id="default-tool-tip"
                  data-tooltip-content={x}
                  key={i}
                  className={`sidebar-icon action-hover ${selectedPage === x && "selected"}`}
                  onClick={() => {
                    if (selectedPage !== x) changeIcon(x);
                  }}>
                  <div>
                    <FontAwesomeIcon icon={PageIconMap[x]} size="xl" />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
export function SideBarNav({
  sideBarNav,
  navClick
}: {
  sideBarNav: SideBarNavElement[];
  navClick: (val: string) => void;
}) {
  if (!sideBarNav) return <>IN CONSTRUCTION</>;
  return (
    <ul>
      {sideBarNav?.map((nav: SideBarNavElement, i: number) => {
        return (
          <li
            key={i}
            className={"nav-element action-hover" + (nav.selected ? " selected" : "")}
            onClick={() => {
              if (!nav.selected) {
                setTimeout(() => nav.onClick(), 2000);
                navClick(nav.value);
              }
            }}>
            <FontAwesomeIcon icon={nav.icon} /> {nav.value}
            <div className="app-notification"></div>
          </li>
        );
      })}
    </ul>
  );
}
