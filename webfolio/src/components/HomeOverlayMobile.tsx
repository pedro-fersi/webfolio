// src/components/HomeOverlayMobile.tsx
import { useEffect, useRef } from "react";
import shellStyles from "../components/PageShell.module.css";
import PcHover from "../assets/Teste 4 mockup pc 1.svg"; // agora é a base
// import PcBase  from "../assets/Teste 5 mockup pc 1.svg";

export default function HomeOverlayMobile() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    let raf = 0;
    const RANGE = 260;

    const update = () => {
      const y = window.scrollY || 0;
      const p = Math.max(0, Math.min(1, y / RANGE));
      ref.current?.style.setProperty("--swap", p.toFixed(3));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };

    const enable = () => { if (!mql.matches) return; update(); window.addEventListener("scroll", onScroll, { passive:true }); };
    const disable = () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); ref.current?.style.setProperty("--swap","0"); };

    const onChange = () => { disable(); enable(); };
    mql.addEventListener?.("change", onChange);
    enable();
    return () => { disable(); mql.removeEventListener?.("change", onChange); };
  }, []);

  return (
    <div className={shellStyles.overlay} aria-hidden="true">
      <div className={shellStyles.overlayItemCenter} ref={ref}>
        <img src={PcHover} alt="" className="layerBase"  /> {/* Teste 4 vira base */}
        {/* <img src={PcBase}  alt="" className="layerHover" /> Teste 5 vira overlay */}
      </div>
    </div>
  );
}
