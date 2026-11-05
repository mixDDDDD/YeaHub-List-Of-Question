import { protectHtmlCodeBlocks } from "./answerMarkup.ts";

type MarkdownNode = {
  type: string;
  value?: string;
  children?: MarkdownNode[];
};

const htmlTags = new Set(
  "a abbr address area article aside audio b base bdi bdo blockquote br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".split(" "),
);

// The API mixes HTML and Markdown without format metadata. Unpaired capitalized
// names can be type parameters (Component<P>), even when a lowercase HTML tag exists.
export const normalizeAnswerHtml = () => (tree: MarkdownNode): void => {
  const visit = (node: MarkdownNode): void => {
    if (node.type === "code" || node.type === "inlineCode") return;
    if (node.type === "html" && node.value) {
      node.value = protectHtmlCodeBlocks(node.value).replace(
        /<\/?([A-Za-z][\w:-]*)\b[^>]*>/g,
        (tag: string, name: string) =>
          htmlTags.has(name) ||
          (htmlTags.has(name.toLowerCase()) &&
            new RegExp(`</${name}\\s*>`).test(node.value ?? ""))
            ? tag
            : tag.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
      );
    }
    node.children?.forEach(visit);
  };
  visit(tree);
};
