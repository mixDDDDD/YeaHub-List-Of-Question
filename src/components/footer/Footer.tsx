import { Icon } from "@/components/icon/Icon";
import styles from "./footer.module.css";
import telegramIcon from "@/assets/icons/social/telegram.svg";
import figmaIcon from "@/assets/icons/social/figma.svg";
import youtubeIcon from "@/assets/icons/social/youtube.svg";
import tiktokIcon from "@/assets/icons/social/tiktok.svg";
import githubIcon from "@/assets/icons/social/github.svg";

const socialLinks = [
  { name: "Figma", href: "https://www.figma.com/community/file/1438482355619792777/yeahub-public", icon: figmaIcon },
  { name: "Telegram", href: "https://t.me/yeahub", icon: telegramIcon },
  { name: "YouTube", href: "https://www.youtube.com/@yeahub", icon: youtubeIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@yeahub_it", icon: tiktokIcon },
  { name: "GitHub", href: "https://github.com/YeaHubTeam/yeahub-platform", icon: githubIcon },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-content"]}>
        <a href="#" className={styles["footer-logo"]} aria-label="На главную">
          <Icon name="footerLogo" aria-hidden="true" />
        </a>
        <p className={styles["footer-slogan"]}>
          Выбери, каким будет IT завтра, вместе с нами
        </p>
        <p className={styles["footer-description"]}>
          YeaHub — это полностью открытый проект, призванный объединить и
          улучшить IT-сферу. Наш исходный код доступен для просмотра на GitHub.
          Дизайн проекта также открыт для ознакомления в Figma.
        </p>
        <hr className={styles["footer-separator"]} />
        <div className={styles["footer-bottom"]}>
          <div className={styles["footer-legal"]}>
            <p>© 2024 YeaHub</p>
            <a href="https://yeahub.ru/ru/docs" target="_blank" rel="noopener noreferrer">
              Документы
            </a>
          </div>
          <div className={styles["footer-social"]}>
            <p>Ищите нас и в других соцсетях @yeahub_it</p>
            <div className={styles["footer-social-links"]}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={link.icon} alt="" width={28} height={28} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
