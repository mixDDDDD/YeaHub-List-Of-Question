import { Logo } from "@/components/logo/Logo";
import { Navigation } from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button/Button";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["header__brand-navigation"]}>
        <Logo />
        <Navigation />
      </div>
      <div className={styles["header__actions"]}>
        <Button variant="secondary">Вход</Button>
        <Button variant="primary">Регистрация</Button>
      </div>
    </header>
  );
};
