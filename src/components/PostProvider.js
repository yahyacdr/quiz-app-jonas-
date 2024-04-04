import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.questions, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + 1
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish" };
    default:
      throw new Error("Unknown action");
  }
}
function PostProvider({ children }) {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    {
      questions: [],
      status: "loading",
      index: 0,
      answer: null,
      points: 0,
    }
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", questions: data }))
      .catch((e) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        status,
        index,
        answer,
        points,
        numQuestions,
        maxPossiblePoints,
        questions,
        question: questions[index],
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function usePosts() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("PostContext was used outside PostProvider");
  return context;
}

export { usePosts, PostProvider };
