import React, { useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScoreCard() {
  const location = useLocation();
  const { score = 0, results = [], total = 10 } = location.state || {};
  const dashboardRef = useRef(null);

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 flex flex-col items-center">
      {/* Score Section */}
      <h1 className="text-xl font-semibold text-gray-700 mb-2">Sentence Construction</h1>
      <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center mb-4">
        <span className="text-3xl font-bold text-green-600">{score}</span>
      </div>
      <p className="text-sm text-gray-600 mb-6">Overall Score</p>

      <p className="text-center text-gray-600 max-w-lg mb-6">
        While you correctly formed several sentences, there are a couple of areas where
        improvement is needed. Pay close attention to sentence structure and word placement
        to ensure clarity and correctness. Review your responses below for more details.
      </p>

      {/* Dashboard Button */}
      <button
        onClick={scrollToDashboard}
        className="border border-violet-500 text-violet-500 hover:bg-violet-100 px-6 py-2 rounded-md mb-10"
      >
        Go to Dashboard
      </button>

      {/* Review Section */}
      <div ref={dashboardRef} className="w-full max-w-4xl space-y-6">
        {results.map((item, index) => (
          <div key={item.questionId} className="p-4 border rounded-md shadow-sm">
            <p className="font-medium text-gray-800 mb-2">
              Q{index + 1}: {item.question}
            </p>
            <div className="text-sm text-gray-700">
              <p>
                Your Answer:{" "}
                <span className={item.isCorrect ? "text-green-600" : "text-red-500"}>
                  {item.userAnswer.join(", ")} {item.isCorrect ? "✅" : "❌"}
                </span>
              </p>
              {!item.isCorrect && (
                <p>
                  Correct Answer:{" "}
                  <span className="text-green-600">{item.correctAnswer.join(", ")}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
