import { NavLink } from "react-router-dom";
import styles from "./TopMenu.module.css";

export default function TopMenu() {
  const items = [
    { to: "/", label: "Inicio" },
    { to: "/trabalhos", label: "Meus Trabalhos" },
    { to: "/sobre", label: "Sobre Mim" },
    { to: "/contato", label: "Contato" },
  ];

  return (
    <div className={styles.wrap}>
      <nav className={styles.menu} aria-label="Navegação principal">
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
            end={i.to === "/"}
          >
            {i.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
