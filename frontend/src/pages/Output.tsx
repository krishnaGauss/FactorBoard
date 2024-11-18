import React from "react";

interface OutputProps {
  res: string;
  expr: string;
}

const Output: React.FC<OutputProps> = ({ res, expr }) => {
  return (
    <div className="fixed bottom-4 right-4 w-[28vw] h-auto bg-gradient-to-br from-blue-700 to-purple-700 p-4 rounded-xl shadow-xl border-2 border-gray-200 text-white">
      <div className="border-b-2 border-gray-400 pb-2 mb-4">
        <h2 className="font-mono text-2xl font-bold text-center">
          🧮 Output
        </h2>
      </div>
      <div className="space-y-4">
        <div className="text-lg font-serif">
          <strong>Expression:</strong>
          <p className="animate-typing border-r-2 border-white inline whitespace-nowrap overflow-hidden max-w-full">
            {expr}
          </p>
        </div>
        <div className="text-lg font-serif">
          <strong>Result:</strong>
          <p className="animate-typing border-r-2 border-white inline whitespace-nowrap overflow-hidden max-w-full">
            {res}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Output;
