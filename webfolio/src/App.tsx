// App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HeaderMarquee from "./components/HeaderMarquee";
import PageShell from "./components/PageShell";
import TopMenu from "./components/TopMenu";

import Home from "./pages/Home";
import Trabalhos from "./pages/Trabalhos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

/* Imagens e CSS desktop (seu original) */
import PcBase from "./assets/Teste 5 mockup pc 1.svg";
import PcHover from "./assets/Teste 4 mockup pc 1.svg";
import homeStyles from "./pages/Home.module.css";

/* NOVO: overlay mobile pronta */
import HomeOverlayMobile from "./components/HomeOverlayMobile";

/* Mantém o BrowserRouter no topo e usa um componente interno
   pra poder usar useLocation sem gambis */
function AppInner() {
  // some o TopMenu em telas menores que 768px (seu comportamento)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // SUA overlay desktop (igual estava)
  const DesktopOverlay = (
    <div className={homeStyles.pcWrapper}>
      <img src={PcBase}  alt="PC retrô" className={homeStyles.pcImg} />
      <img src={PcHover} alt="PC retrô (hover)" className={`${homeStyles.pcImg} ${homeStyles.pcImgHover}`} />
    </div>
  );

  // Escolha por viewport e rota (Home)
  const overlay = isHome ? (isMobile ? <HomeOverlayMobile /> : DesktopOverlay) : null;

  return (
    <>
      <HeaderMarquee
        items={["Figma","After Effects","Premiere","Davinci Resolve","Illustrator","Photoshop"]}
        speed={120}
        gap={48}
        paddingX={48}
        height={48}
        bg="#F5C518"
        color="#FCF6EB"
        fontSize={16}
        fixed
        autoHide
      />

      <PageShell as="main" overlay={overlay}>
        {!isMobile && <TopMenu />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trabalhos" element={<Trabalhos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </PageShell>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
