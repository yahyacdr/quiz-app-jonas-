import { usePosts } from "./PostProvider";

export default function Option() {
  const { question, dispatch, answer } = usePosts();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((op, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={op}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {op}
        </button>
      ))}
    </div>
  );
}
