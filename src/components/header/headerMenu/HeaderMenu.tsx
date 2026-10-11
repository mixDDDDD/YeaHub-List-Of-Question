import { Button } from "@/components/ui/button/Button";
import styles from "./headerMenu.module.css";

type HeaderMenuProps = {
  id: string;
};

export const HeaderMenu = ({ id }: HeaderMenuProps) => {
  return (
    <div id={id} className={styles["header-menu"]}>
      <div className={styles["header-menu__actions"]}>
        <Button variant="secondary">Вход</Button>
        <Button variant="primary">Регистрация</Button>
      </div>
    </div>
  );
};
