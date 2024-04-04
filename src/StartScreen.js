import { usePosts } from "./components/PostProvider";

export default function StartScreen() {
  const { numQuestions, dispatch } = usePosts();
  return (
    <div className="start">
      <h2>Welcome to The REact Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}
