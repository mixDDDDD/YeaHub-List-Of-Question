import clsx from "clsx";
import styles from "./navigation.module.css";
import { useId, useRef, useState } from "react";
import { Icon } from "@/components/icon/Icon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useKeyDown } from "@/hooks/useKeyDown";

const links = [
  { label: "База вопросов", href: "#questions", emphasized: true },
  { label: "Тренажёр", href: "#trainer" },
  { label: "Материалы", href: "#materials" },
  { label: "Навыки (hh)", href: "#skills" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const navigationRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useClickOutside(navigationRef, () => setIsOpen(false), isOpen);
  useKeyDown("Escape", (event) => {
    event.preventDefault();
    setIsOpen(false);
    toggleRef.current?.focus();
  }, isOpen);

  return (
    <nav ref={navigationRef} className={styles.navigation} aria-label="Основная навигация">
      <button
        ref={toggleRef}
        type="button"
        className={styles["navigation-toggle"]}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        Подготовка
        <Icon name="chevronBottom" aria-hidden="true" />
      </button>
      <ul
        id={menuId}
        className={clsx(
          styles["navigation__list"],
          isOpen && styles["navigation__list--open"],
        )}
      >
        {links.map(({ label, href, emphasized }) => (
          <li key={href}>
            <a
              className={clsx(
                styles["navigation__link"],
                emphasized && styles["navigation__link--active"],
              )}
              href={href}
              onClick={() => setIsOpen(false)}
              aria-current={emphasized ? "page" : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
