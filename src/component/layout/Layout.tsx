import "./Layout.scss";
import { Content } from "@component/content/Content";
import { Header } from "@component/header/Header";
import { Footer } from "@component/footer/Footer";
import { useDataContext } from "@context/DataContext";
export const Layout = () => {
  const { selectedUser } = useDataContext();
  return (
    <div className={`layout ${selectedUser?.UserName}`}>
      <div id="background" className="background">
        <img src={`/assets/YingYang.png`} />
      </div>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  );
};
