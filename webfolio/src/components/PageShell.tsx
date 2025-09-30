// src/components/PageShell.tsx
import styles from "./PageShell.module.css";
import type { PropsWithChildren, ElementType, ReactNode } from "react";

type PageShellProps = {
  as?: ElementType;
  className?: string;
  overlay?: ReactNode;
  noCardBg?: boolean; // <- NOVO
};

export default function PageShell({
  as = "main",
  className,
  overlay,
  noCardBg = false,   // <- NOVO
  children,
}: PropsWithChildren<PageShellProps>) {
  const Tag = as as ElementType;

  return (
    <div className={styles.shell}>
      <div className={`${styles.card} ${noCardBg ? styles.cardNoBg : ""}`}>
        <Tag className={`${styles.content} ${className ?? ""}`}>{children}</Tag>
      </div>
      <div className={styles.overlay}>{overlay}</div>
    </div>
  );
}
