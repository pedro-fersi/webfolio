// src/pages/Landing.tsx
import { useEffect, useRef, useState } from "react";
import PageShell from "../components/PageShell";
import TopMenu from "../components/TopMenu";

import Home from "./Home";
import Sobre from "./Sobre";
import Trabalhos from "./Trabalhos";
import Contato from "./Contato";

/* Overlays da Home */
import PcBase from "../assets/Teste 5 mockup pc 1.svg";
import PcHover from "../assets/Teste 4 mockup pc 1.svg";
import HomeOverlayMobile from "../components/HomeOverlayMobile";
import homeStyles from "./Home.module.css";

export default function Landing({ initialTarget }: { initialTarget?: string }) {
  // Detecta mobile (<= 768px) para overlay e para esconder o TopMenu
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Overlay da HOME: desktop (hover) vs mobile (estático / crossfade)
  const DesktopOverlay = (
    <div className={homeStyles.pcWrapper}>
      <img src={PcBase} alt="PC retrô" className={homeStyles.pcImg} />
      <img
        src={PcHover}
        alt="PC retrô (hover)"
        className={`${homeStyles.pcImg} ${homeStyles.pcImgHover}`}
      />
    </div>
  );
  const overlay = isMobile ? <HomeOverlayMobile /> : DesktopOverlay;

  // Scroll inicial para /#sobre, /#trabalhos, /#contato (ou initialTarget)
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const id = (initialTarget || window.location.hash.replace("#", "")).trim();
    if (!id) return;

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [initialTarget]);

  return (
    <>
      {/* HOME — cartão creme + overlay + TopMenu (desktop) */}
      <PageShell as="section" overlay={overlay}>
        {!isMobile && <TopMenu />}
        {/* Dar um id para âncora funcionar com o menu */}
        <section id="home">
          <Home />
        </section>
      </PageShell>

      {/* SOBRE — sem cartão creme (usa noCardBg) */}
      <PageShell as="section" noCardBg>
        <section id="sobre">
          <Sobre />
        </section>
      </PageShell>

      {/* MEUS TRABALHOS — sem cartão creme */}
      <PageShell as="section" noCardBg>
        <section id="trabalhos">
          <Trabalhos />
        </section>
      </PageShell>

      {/* CONTATO — sem cartão creme */}
      <PageShell as="section" noCardBg>
        <section id="contato">
          <Contato />
        </section>
      </PageShell>
    </>
  );
}
