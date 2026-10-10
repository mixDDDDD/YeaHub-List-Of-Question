import { useSyncExternalStore } from "react";
import { Header } from "@/components/header/Header";
import { QuestionsPage } from "@/components/questionsPage/QuestionsPage";
import { QuestionPage } from "@/components/questionPage/QuestionPage";

const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

const getHash = () => window.location.hash;

function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash);
  const match = /^#\/questions\/([1-9]\d*)$/.exec(hash);
  const questionId = match ? Number(match[1]) : null;

  return (
    <>
      <Header />
      {/* Сохраняем страницу списка и выбранные фильтры при переходе к вопросу. */}
      <div hidden={questionId !== null}>
        <QuestionsPage />
      </div>
      {questionId !== null && (
        <QuestionPage key={questionId} questionId={questionId} />
      )}
    </>
  );
}

export default App;
