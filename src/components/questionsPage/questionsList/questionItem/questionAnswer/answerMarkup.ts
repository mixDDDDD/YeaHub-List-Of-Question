import type { Element, Root, RootContent } from "hast";

const visitElements = (node: Root | RootContent, callback: (element: Element) => void): void => {
  if (node.type === "element") callback(node);
  if ("children" in node) node.children.forEach((child) => visitElements(child, callback));
};

const readText = (node: RootContent): string => {
  if (node.type === "text") return node.value;
  if (node.type === "element" && node.tagName === "br") return "\n";
  return "children" in node ? node.children.map(readText).join("") : "";
};

const inferLanguage = (code: string): string | undefined => {
  if (/^\s*(?:<!doctype\s+html|<[a-z][\w:-]*\b)/i.test(code)) {
    return /<[A-Z][\w.]*|\bclassName=|\bon[A-Z]\w*=|=\s*\{/.test(code)
      ? "javascript"
      : "xml";
  }
  if (/(?:^|\n)\s*(?:import|export|function|const|let|var|return|class)\b|=>/.test(code)) {
    return "javascript";
  }
  if (/(?:^|\n)\s*[^{}\n]+\{\s*[a-z-]+\s*:/i.test(code)) return "css";
  return undefined;
};

const languageAliases: Record<string, string> = {
  js: "javascript", jsx: "javascript", javascript: "javascript",
  ts: "typescript", tsx: "typescript", typescript: "typescript",
  html: "xml", xml: "xml", css: "css", json: "json",
  python: "python", py: "python", bash: "bash", sql: "sql",
};

// Each pre must contain one direct code child for rehype-highlight to process it.
export const normalizeCodeBlocks = () => (tree: Root): void => {
  visitElements(tree, (element) => {
    if (element.tagName !== "pre") return;
    const code = element.children.find(
      (child): child is Element => child.type === "element" && child.tagName === "code",
    );
    const classes = code?.properties.className;
    const languageClass = Array.isArray(classes)
      ? classes.find((value) => typeof value === "string" && /^(?:language-|lang-)/.test(value))
      : undefined;
    const requestedLanguage = typeof languageClass === "string"
      ? languageClass.replace(/^(?:language-|lang-)/, "").toLowerCase()
      : "";
    const source = element.children.map(readText).join("");
    const language = languageAliases[requestedLanguage] ?? inferLanguage(source);
    element.children = [{
      type: "element",
      tagName: "code",
      properties: language ? { className: [`language-${language}`] } : {},
      children: [{ type: "text", value: source }],
    }];
  });
};

export const highlightComponentNames = () => (tree: Root): void => {
  visitElements(tree, (element) => {
    const classes = element.properties.className;
    if (element.tagName === "span" && Array.isArray(classes) &&
      classes.includes("hljs-name") && /^[A-Z]/.test(readText(element))) {
      element.properties.className = ["hljs-title"];
    }
  });
};

export const protectHtmlCodeBlocks = (answer: string): string => answer.replace(
  /(<pre\b[^>]*>\s*<code\b[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/gi,
  (_match, opening: string, code: string, closing: string) => {
    // Encoded line breaks keep Markdown from parsing paragraphs inside HTML code.
    const protectedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\r\n?|\n/g, "&#10;").replace(/\t/g, "&#9;");
    return `${opening}${protectedCode}${closing}`;
  },
);

export const asCodeFence = (code: string): string => {
  const longestRun = Math.max(0, ...(code.match(/`+/g) ?? []).map((run) => run.length));
  const fence = "`".repeat(Math.max(3, longestRun + 1));
  return `${fence}\n${code}\n${fence}\n\n`;
};
