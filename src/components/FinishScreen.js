import React from "react";
import { usePosts } from "./PostProvider";

export default function FinishScreen() {
  const { points, maxPossiblePoints } = usePosts();
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPossiblePoints}(
      {Math.ceil(percentage)}%)
    </p>
  );
}
