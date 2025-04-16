import { useEffect, useState } from "react";
import questionsData from "../data/questions.json";
import { useNavigate } from "react-router-dom";

export default function QuestionPage() {
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const questions = questionsData.data.questions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);

  const question = questions[currentQuestion];
  
  const handleNext = () => {
    const isCorrect =
      JSON.stringify(selectedWords) === JSON.stringify(question.correctAnswer);
  
    const resultEntry = {
      questionId: question.id,
      question: question.question,
      userAnswer: selectedWords,
      correctAnswer: question.correctAnswer,
      isCorrect,
    };
  
    setResults((prev) => [...prev, resultEntry]);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // All questions done – redirect to ScoreCard
      navigate("/ScoreCard", {
        state: {
          score: Math.round((score + (isCorrect ? 1 : 0)) / questions.length * 100),
          results: [...results, resultEntry],
          total: questions.length,
        },
      });
    }
  };
  
  useEffect(() => {
    setSelectedWords([]);
    setTimeLeft(15);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNext();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleSelectWord = (word) => {
    if (
      !selectedWords.includes(word) &&
      selectedWords.length < question.correctAnswer.length
    ) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const renderSentence = () => {
    const parts = question.question.split("_____");
    const filled = [...selectedWords];
    let combined = [];

    for (let i = 0; i < parts.length; i++) {
      combined.push(parts[i]);
      if (i < question.correctAnswer.length) {
        combined.push(
          <span key={i} className="underline mx-1 font-semibold text-gray-800">
            {filled[i] || "_____"}
          </span>
        );
      }
    }

    return combined;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-white px-4">
      <div className="w-full max-w-3xl text-center">
        {/* Timer + Quit Button */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-600">
            0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
          <button className="text-sm text-gray-500 border px-3 py-1 rounded-md hover:bg-gray-100">
            Quit
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-orange-400 transition-all duration-300"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          ></div>
        </div>

        {/* Question Prompt */}
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Select the missing words in the correct order
        </h2>

        {/* Question Sentence */}
        <p className="text-xl text-gray-800 mb-6 leading-8">
          {renderSentence()}
        </p>

        {/* Options */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          {question.options.map((word) => (
            <button
              key={word}
              className={`px-4 py-2 border rounded-lg transition-all ${
                selectedWords.includes(word)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleSelectWord(word)}
              disabled={selectedWords.includes(word)}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="ml-auto block bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
