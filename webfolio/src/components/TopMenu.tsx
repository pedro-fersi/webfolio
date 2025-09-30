// src/components/TopMenu.tsx
import styles from "./TopMenu.module.css";

function getScrollOffset(): number {
  // tenta ler da CSS var --scroll-offset, senão cai no fallback
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--scroll-offset")
    .trim();

  const n = parseInt(v.replace("px", ""), 10);
  return Number.isFinite(n) ? n : 72; // fallback: 72px
}

export default function TopMenu() {
  const items = [
    { id: "home",       label: "Início" },
    { id: "trabalhos",  label: "Meus Trabalhos" },
    { id: "sobre",      label: "Sobre Mim" },
    { id: "contato",    label: "Contato" },
  ];

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const el = document.getElementById(id);
    if (!el) {
      // fallback → muda rota inteira (ex: se estiver em outra página)
      window.location.href = id === "home" ? "/" : `/#${id}`;
      return;
    }

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const offset = getScrollOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: prefersReduced ? "auto" : "smooth",
    });

    // Atualiza a URL (sem duplicar histórico)
    if (id === "home") {
      history.replaceState(null, "", "/");
    } else {
      history.replaceState(null, "", `/#${id}`);
    }
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
