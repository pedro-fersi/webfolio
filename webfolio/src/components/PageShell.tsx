
import styles from "./PageShell.module.css";
import type { PropsWithChildren, ElementType, ReactNode } from "react";

type PageShellProps = {
  as?: ElementType;
  className?: string;
  overlay?: ReactNode;        // << conteúdo que vai na camada que NÃO recorta
};

export default function PageShell({
  as = "main",
  className,
  overlay,
  children,
}: PropsWithChildren<PageShellProps>) {
  const Tag = as as ElementType;

  return (
    <div className={styles.shell}>
      <div className={styles.card}>
        <Tag className={`${styles.content} ${className ?? ""}`}>{children}</Tag>
      </div>
      <div className={styles.overlay}>{overlay}</div>
    </div>
  );
}
