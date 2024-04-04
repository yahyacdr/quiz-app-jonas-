import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./components/NextButton.js";
import Progress from "./components/Progress.js";
import FinishScreen from "./components/FinishScreen.js";
import Options from "./components/Options.js";
import { usePosts } from "./components/PostProvider.js";

export default function App() {
  const { status } = usePosts();
  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question>
              <Options />
            </Question>
            <NextButton />
          </>
        )}
        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}
