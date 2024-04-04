import { usePosts } from "./components/PostProvider";

export default function Question({ children }) {
  const { question } = usePosts();
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      {children}
    </div>
  );
}
