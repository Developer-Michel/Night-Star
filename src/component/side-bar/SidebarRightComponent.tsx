// import { faClock, faCode } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useContext } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';

// export function GlobalNavigation(props: { extraAction: () => void, navClick: (val: string) => void }) {
//     const { user } = useContext(UserControllerContext);
//     const navigate = useNavigate();
//     const content: JSX.Element[] = [];
//     let key = 0;

//     const currentUrl = window.location.href.toUpperCase();
//     for (let i = 0; i < possibleContext.length; i++) {
//         const part = possibleContext[i];
//         content.push(<h2 className="nav-element" key={key++}> {part.name}</h2>);
//         const list: JSX.Element[] = [];
//         let count = 0;
//         for (let n = 0; n < part.list.length; n++) {

//             const nav = part.list[n];
//             if (nav.PermissionLevel <= user.Role.Level) {
//                 count++;
//                 const selected = currentUrl.includes(nav.link.toUpperCase());
//                 list.push(<li key={key++} className={"nav-element action-hover" + (selected ? " selected" : "")} onClick={() => { if (!selected) { setTimeout(() => { navigate(nav.link); }, 1000); props.extraAction(); props.navClick(nav.type) } }}><FontAwesomeIcon icon={nav.icon} />  {nav.type}<div className="app-notification"></div></li>)
//             }

//         }
//         if (count > 0)
//             content.push(<ul key={key++}>{list}</ul>)
//         else
//             content.pop();
//     }
//     return <>
//         {content}</>

// }

// export function HistoryExplorer() {
//     return <>NOTHING FOR NOW</>
// }
// export function ErrorHistoryViewer() {
//     const list = getLoggedErrors();
//     const { showUniversalModalContent } = useModal();

//     return (
//         <DragScrollContainer style={{ height: "100%" }}>

//             {list.map((x, i) => {
//                 const isHtml = JSON.stringify(x.content)?.startsWith("<") ?? false;
//                 const content = isHtml ? "Click on me to show the error!" : "" + x.content;
//                 const extraInfo = isHtml ? "" + x.content + x.extraInformation : x.extraInformation;
//                 return <Container onClick={() => { showUniversalModalContent({ content: x.content + "<br><br>" + extraInfo, title: "Extra Error information" }) }} key={i} style={{ width: "100%", border: "double 4px" }}>
//                     <Row><Col><FontAwesomeIcon icon={faCode} />
//                         {x.type}</Col>

//                     </Row>
//                     <Row>

//                         <Col>
//                             <FontAwesomeIcon icon={faClock} /> {x.time.toString()}</Col></Row>

//                     <Row style={{ overflow: "hidden" }}><Col>{content}</Col></Row>
//                 </Container>
//             })}
//         </DragScrollContainer>
//     )
// }
