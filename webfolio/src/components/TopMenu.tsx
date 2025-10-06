// src/components/TopMenu.tsx
import React, { useRef } from "react";
import styles from "./TopMenu.module.css";

/** Lê o offset global e soma o “respiro” que você curtiu */
function getScrollOffset(): number {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--scroll-offset")
    .trim();
  const n = parseInt(v.replace("px", ""), 10);
  const base = Number.isFinite(n) ? n : 72;
  return base + 16;
}

/** Descobre quem é o scroller raiz (janela na sua app) */
function getScrollRoot(): HTMLElement {
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

/** Easing suave (easeInOutCubic) */
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Anima a rolagem manualmente (ignora reduce-motion do SO/navegador) */
function smoothScrollTo(yTarget: number, duration = 500) {
  const root = getScrollRoot();
  const start = root.scrollTop;
  const delta = Math.max(yTarget, 0) - start;

  if (Math.abs(delta) < 1) return; // já está no lugar

  let rafId = 0;
  let t0: number | null = null;

  const step = (ts: number) => {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / duration);
    const eased = ease(p);
    root.scrollTop = start + delta * eased;
    if (p < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(rafId);
    }
  };

  rafId = requestAnimationFrame(step);
}

export default function TopMenu() {
  const items = [
    { id: "home",       label: "Início" },
    { id: "trabalhos",  label: "Meus Trabalhos" },
    { id: "sobre",      label: "Sobre Mim" },
    { id: "contato",    label: "Contato" },
  ];

  // evita animações concorrentes entre cliques
  const animRef = useRef<number | null>(null);

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    if (id === "home") {
      smoothScrollTo(0, 550);
      history.replaceState(null, "", "/");
      return;
    }

    const el = document.getElementById(id);
    if (!el) {
      // outra rota: deixa navegar; a animação na chegada pode ser tratada no PageShell, se quiser
      window.location.href = `/#${id}`;
      return;
    }

    const offset = getScrollOffset();
    const target = el.getBoundingClientRect().top + window.scrollY - offset;

    // força animação suave independente de preferências do SO
    smoothScrollTo(target, 550);

    // A11y: foco sem novo scroll
    const mustRestore = !el.hasAttribute("tabindex");
    if (mustRestore) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    if (mustRestore) setTimeout(() => el.removeAttribute("tabindex"), 300);

    history.replaceState(null, "", `/#${id}`);
  };

  return (
    <div className={styles.wrap}>
      <nav className={styles.menu} aria-label="Navegação principal">
        {items.map((i) => (
          <a
            key={i.id}
            href={i.id === "home" ? "/" : `/#${i.id}`}
            onClick={(e) => onNav(e, i.id)}
            className={styles.link}
          >
            {i.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
