import { PostAbout } from "../../components/PostAbout/PostAbout";
import { motion } from "framer-motion";
import style from "./About.module.scss";

export const About = () => {
  return (
    <div className={style.about}>
      <div className={style.title}>
        <h1>Sobre o projeto</h1>
        <p>
          Este é um miniblog onde podemos compartilhar posts com titulo
          descrição e uma imagem, podemos editar e excluir quando quiser
        </p>
      </div>
      <div className={style.imageAbout}>
        <img src="./about-image.png" alt="" />
        <a href="https://www.linkedin.com/in/wallace-bezerra/" target="_blank">
          <motion.img
            src="./Linkedin.svg"
            className={style.iconLinkedin}
            alt="Icone Linkedin"
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", duration: 0.8 },
              filter: { brightness: 2 },
            }}
          />
        </a>
        <a
          href="https://github.com/Wallace-Bezerra"
          target="_blank"
          className={style.iconGit}
        >
          <motion.img
            src="./GitHub.svg"
            alt="Icone GitHub"
            whileHover={{
              scale: 1.1,
              transition: { type: "spring", duration: 0.8 },
              filter: { brightness: 2 },
            }}
          />
        </a>
      </div>
      <div className={style.aboutPosts}>
        <PostAbout
          image={"./react.png"}
          title="React"
          link="https://reactjs.org/"
        />
        <PostAbout
          image={"./firebase.png"}
          title="Firebase"
          link="https://firebase.google.com/"
        />
      </div>
    </div>
  );
};
