import "./Layout.scss";
import { Content } from "@component/content/Content";
import { Header } from "@component/header/Header";
import { Footer } from "@component/footer/Footer";
export const Layout = () => {
  return (
    <div className="layout">
      <div className="background">
        <img src={`public/assets/YingYang.png`} />
      </div>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  );
};
