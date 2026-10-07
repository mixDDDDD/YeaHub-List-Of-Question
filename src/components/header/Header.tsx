import { Logo } from "../logo/Logo";
import { Navigation } from "../navigation/Navigation";
import { Button } from "../ui/button/Button";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["brand-navigation"]}>
        <Logo />
        <Navigation />
      </div>
      <div className={styles["button-wrapper"]}>
        <Button variant="secondary">Вход</Button>
        <Button variant="primary">Регистрация</Button>
      </div>
    </header>
  );
};
