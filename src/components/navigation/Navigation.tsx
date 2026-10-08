import clsx from "clsx";
import styles from "./navigation.module.css";

const links = [
  { label: "База вопросов", href: "#questions", emphasized: true },
  { label: "Тренажёр", href: "#trainer" },
  { label: "Материалы", href: "#materials" },
  { label: "Навыки (hh)", href: "#skills" },
];

export const Navigation = () => {
  return (
    <nav className={styles.navigation} aria-label="Основная навигация">
      <ul className={styles["navigation__list"]}>
        {links.map(({ label, href, emphasized }) => (
          <li key={href}>
            <a
              className={clsx(
                styles["navigation__link"],
                emphasized && styles["navigation__link--active"],
              )}
              href={href}
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
