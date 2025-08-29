import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./HeaderMarquee.module.css";

type HeaderMarqueeProps = {
  items: string[];
  speed?: number;     // px/s real
  gap?: number;       // espaçamento entre itens
  paddingX?: number;  // respiro nas laterais da viewport
  height?: number;
  bg?: string;
  color?: string;
  fontSize?: number;
  fixed?: boolean;
  ariaLabel?: string;
  autoHide?: boolean; // NOVO: esconde ao rolar para baixo
};

export default function HeaderMarquee({
  items,
  speed = 90,
  gap = 48,
  paddingX = 48,
  height = 48,
  bg = "#F5C518",
  color = "#FCF6EB",
  fontSize = 16,
  fixed = true,
  ariaLabel = "Ferramentas",
  autoHide = true,
}: HeaderMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState<string[]>(items);
  const [distance, setDistance] = useState<number>(0); // largura de UMA sequência expandida

  // Vars de estilo controladas por React
  const styleVars: React.CSSProperties = {
    ["--marquee-bg" as any]: bg,
    ["--marquee-color" as any]: color,
    ["--marquee-size" as any]: `${fontSize}px`,
    ["--marquee-gap" as any]: `${gap}px`,
    ["--marquee-padding-x" as any]: `${paddingX}px`,
    ["--marquee-height" as any]: `${height}px`,
  };

  // Sequência base (sem duplicar ainda)
  const base = useMemo(() => [...items], [items]);

  // Medir e expandir até cobrir a viewport (com sobra)
  useLayoutEffect(() => {
    const recompute = () => {
      const vw = viewportRef.current?.clientWidth ?? 0;
      if (!measureRef.current || vw === 0) return;

      const baseWidth = measureRef.current.scrollWidth; // largura de 1x a lista base
      let factor = 1;
      if (baseWidth < vw) factor = Math.ceil(vw / baseWidth) + 1; // +1 de folga
      const nextExpanded = Array.from({ length: factor }, () => base).flat();
      setExpanded(nextExpanded);
      setDistance(Math.max(1, baseWidth * factor)); // px
    };

    recompute();

    let t: number | null = null;
    const ro = new ResizeObserver(() => {
      if (t) cancelAnimationFrame(t);
      t = requestAnimationFrame(recompute);
    });
    if (viewportRef.current) ro.observe(viewportRef.current);

    return () => {
      ro.disconnect();
      if (t) cancelAnimationFrame(t);
    };
  }, [base]);

  // Loop com requestAnimationFrame (anima a translação contínua)
  const posRef = useRef(0);              // posição atual (px)
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function tick(ts: number) {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000; // em segundos
      lastTsRef.current = ts;

      posRef.current -= speed * dt;

      // quando andar a distância de UMA sequência, “teleporta” sem flicker
      if (distance > 0 && posRef.current <= -distance) {
        posRef.current += distance;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${posRef.current}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    const onVisibility = () => {
      lastTsRef.current = null; // ressincroniza o delta
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [speed, distance]);

  // Se distância mudou, mantém posição dentro do novo intervalo para não “pular”
  useEffect(() => {
    if (distance > 0) {
      posRef.current = (((posRef.current % distance) + distance) % distance) * -1;
    }
  }, [distance]);

  // ===== Auto-hide no scroll (esconde descendo, mostra subindo) =====
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    if (!autoHide) return;

    lastYRef.current = window.scrollY;

    const threshold = 8; // pixels de tolerância
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastYRef.current;

      // sempre visível no topo
      if (y <= 0) {
        setHidden(false);
        lastYRef.current = y;
        return;
      }

      // ignora micro movimentos
      if (Math.abs(dy) < threshold) return;

      // rolando pra baixo → esconde; pra cima → mostra
      setHidden(dy > 0);
      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [autoHide]);

  // Estilo final do header (aplica o translateY para esconder/mostrar)
  const headerStyle: React.CSSProperties = {
    ...styleVars,
    transform: hidden ? "translateY(-100%)" : "translateY(0)",
    willChange: "transform",
    transition: "transform .28s ease",
  };

  // Duas listas idênticas para o loop perfeito
  const seqA = expanded;
  const seqB = expanded;

  return (
    <header
      className={[styles.topbar, fixed ? styles.fixed : ""].join(" ")}
      role="banner"
      aria-label={ariaLabel}
      style={headerStyle}
    >
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track} ref={trackRef} aria-hidden="true">
          <ul className={styles.list}>
            {seqA.map((t, i) => (
              <li key={`A-${t}-${i}`} className={styles.item}>
                {t}
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {seqB.map((t, i) => (
              <li key={`B-${t}-${i}`} className={styles.item}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* medidor invisível da sequência base */}
      <ul className={styles.measure} ref={measureRef} aria-hidden="true">
        {base.map((t, i) => (
          <li key={`M-${t}-${i}`} className={styles.item}>
            {t}
          </li>
        ))}
      </ul>
    </header>
  );
}
