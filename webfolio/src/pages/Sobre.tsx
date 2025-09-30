// src/pages/Sobre.tsx
import styles from "./Sobre.module.css";

export default function Sobre() {
  return (
    <section id="sobre" className={styles.wrap}>
      <div className={styles.panel}>
        {/* Painel azul com círculo magenta e conteúdo */}
        <div className={styles.panelBg}>
          {/* Lado esquerdo: foto/colagem */}
          <figure className={styles.media}>
            <img
              src="/src/assets/Foto_Sobre.svg"
              alt="Pedro em sequência de fotos estilo fotocabine"
              loading="lazy"
            />
          </figure>

          {/* Lado direito: texto */}
          <div className={styles.copy}>
            <h2 className={styles.title}>
              <span>sobre</span> mim<span className={styles.dot}>.</span>
            </h2>

            <p>
              Oi, eu sou o Pedro! Um criativo de São Paulo que sempre achou
              divertido transformar ideias em coisas visuais. Desde pequeno vivo
              inventando, desenhando e criando — hoje faço isso como designer,
              diretor de arte e explorador de experiências digitais.
            </p>

            <p>
              Gosto de misturar criatividade com técnica: sei me virar bem com
              Photoshop, Illustrator, After Effects, Premiere e Figma, além de
              mandar bem em UI/UX. Também tenho aquela base de front-end (HTML,
              CSS, JavaScript) que ajuda a pensar o design já com um pezinho no
              código.
            </p>

            <p>
              Quando não tô mergulhado em design ou edição de vídeo,
              provavelmente tô caçando referências, testando coisas novas no
              Figma, tirando fotos ou só absorvendo ideias que depois viram
              projetos. No fim das contas, meu objetivo é simples: criar algo
              que faça as pessoas parar por um segundo, sentir algo e lembrar
              que até no detalhe mais pequeno pode existir beleza.
            </p>
          </div>
        </div>

        {/* Mãos decorativas (fora do clipping) */}
        <img
          src="/src/assets/hand 1.svg"
          alt=""
          className={styles.hands1}
          aria-hidden="true"
        />
        <img
          src="/src/assets/hand 2.svg"
          alt=""
          className={styles.hands2}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
