import { useRef, useState } from "react";
import type { Components } from "react-markdown";
import { Icon } from "@/components/icon/Icon";
import styles from "./codeBlock.module.css";

export const QuestionCodeBlock: Components["pre"] = ({
  children,
  node,
  ...preProps
}) => {
  void node;

  const codeRef = useRef<HTMLPreElement>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeRef.current?.textContent ?? "");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "Код скопирован"
      : copyStatus === "error"
        ? "Не удалось скопировать код"
        : "Скопировать код";

  return (
    <div className={styles["code-block"]}>
      <pre
        {...preProps}
        ref={codeRef}
        className={styles["code-block__pre"]}
      >
        {children}
      </pre>
      <button
        className={styles["code-block__copy"]}
        type="button"
        aria-label={copyLabel}
        title={copyLabel}
        onClick={() => void copyCode()}
      >
        <Icon
          name="copy"
          className={styles["code-block__copy-icon"]}
          aria-hidden="true"
        />
      </button>
      <span
        className={styles["code-block__status"]}
        aria-live="polite"
      >
        {copyStatus === "idle" ? "" : copyLabel}
      </span>
    </div>
  );
};

