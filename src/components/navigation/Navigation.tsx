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
      <ul className={styles.list}>
        {links.map(({ label, href, emphasized }) => (
          <li key={href}>
            <a
              className={emphasized ? styles.emphasized : styles.link}
              href={href}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
