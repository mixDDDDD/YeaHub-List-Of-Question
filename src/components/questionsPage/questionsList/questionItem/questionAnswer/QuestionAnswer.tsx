import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { QuestionCodeBlock } from "./QuestionCodeBlock";
import {
  asCodeFence,
  highlightComponentNames,
  normalizeCodeBlocks,
  protectHtmlCodeBlocks,
} from "./answerMarkup";
import styles from "./questionAnswer.module.css";

type QuestionAnswerProps = {
  answer: string;
  code?: string | null;
};

export const QuestionAnswer = ({ answer, code }: QuestionAnswerProps) => (
  <div className={styles["question-answer"]}>
    <Markdown
      components={{ pre: QuestionCodeBlock }}
      rehypePlugins={[
        rehypeRaw,
        normalizeCodeBlocks,
        rehypeSanitize,
        [rehypeHighlight, {
          detect: true,
          subset: ["javascript", "typescript", "xml", "css", "json", "python", "bash", "sql"],
        }],
        highlightComponentNames,
      ]}
    >
      {`${code ? asCodeFence(code) : ""}${protectHtmlCodeBlocks(answer)}`}
    </Markdown>
  </div>
);
