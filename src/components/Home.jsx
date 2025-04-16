import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="h-14 shadow-sm w-screen text-2xl font-medium text-gray-700 p-2">
        Sentence Construction
      </h1>

      <div className="text-6xl text-gray-400 mt-10">📝</div>

      <h2 className="text-3xl font-semibold text-gray-900 mt-6">
        Sentence Construction
      </h2>

      <p className="text-gray-600 max-w-md mb-8 mt-7">
        Select the correct words to complete the sentence by arranging the
        provided options in the right order.
      </p>

      <div className="flex justify-center items-center gap-6 mb-8">
        <div className="text-center">
          <p className="text-sm text-gray-500">Time Per Question</p>
          <p className="font-semibold text-gray-800">30 sec</p>
        </div>
        <div className="border-l h-10 border-gray-300"></div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Questions</p>
          <p className="font-semibold text-gray-800">10</p>
        </div>
        <div className="border-l h-10 border-gray-300"></div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Coins</p>
          <div className="flex items-center justify-center font-semibold text-gray-800">
            <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2" />0
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-md border border-indigo-500 text-indigo-600 font-medium hover:bg-indigo-50"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/QuestionPage")}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          Start
        </button>
      </div>
    </div>
  );
}
