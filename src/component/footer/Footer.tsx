import "./Footer.scss";
// import { Col } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { PageType, PageIconMap } from "@component/side-bar/Types";
export const Footer = () => {
  // const { selectedUser } = useDataContext();
  // if (!selectedUser) return <></>; //default return if no user were selected
  // const allPages = Object.values(PageType);
  return (
    <div className="footer">
      {/* <Container fluid>
        <Row>
          {allPages
            .filter((x) => x != "PROFILE" && x != "NOTIFICATION")
            .map((page) => (
              <PageButton key={page} page={page} />
            ))}
        </Row>
      </Container> */}
    </div>
  );
};
// const PageButton = ({ page }: { page: PageType }) => {
//   const { selectedPage, setSelectedPage } = useDataContext();
//   return (
//     <Col
//       onClick={() => {
//         setSelectedPage(page);
//       }}>
//       <div className={`page-button ${selectedPage === page && "selected"}`}>
//         <FontAwesomeIcon icon={PageIconMap[page]} />
//       </div>
//     </Col>
//   );
// };
