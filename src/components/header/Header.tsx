import { Logo } from "@/components/logo/Logo";
import { Navigation } from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button/Button";
import styles from "./header.module.css";
import { Icon } from "@/components/icon/Icon";
import { useId, useRef, useState } from "react";
import { HeaderMenu } from "@/components/header/headerMenu/HeaderMenu";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useKeyDown } from "@/hooks/useKeyDown";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeMenuAndFocus = () => {
    closeMenu();
    burgerRef.current?.focus();
  };

  useClickOutside(menuRef, closeMenu, isMenuOpen);
  useKeyDown("Escape", (event) => {
    event.preventDefault();
    closeMenuAndFocus();
  }, isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles["header__brand-navigation"]}>
        <Logo />
        <Navigation />
      </div>
      <div ref={menuRef} className={styles["header__actions"]}>
        <div className={styles["header__auth"]}>
          <Button variant="secondary">Вход</Button>
          <Button variant="primary">Регистрация</Button>
        </div>
        <button
          ref={burgerRef}
          type="button"
          className={styles["header__burger"]}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-expanded={isMenuOpen}
          aria-controls={isMenuOpen ? menuId : undefined}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <Icon name="hamburgerMenu" aria-hidden="true" />
        </button>
        {isMenuOpen && <HeaderMenu id={menuId} />}
      </div>
    </header>
  );
};
