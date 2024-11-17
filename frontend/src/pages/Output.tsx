const Output = () => {
  return (
    <div className="w-[25vw] h-[30vh] fixed right-0 bottom-0 border-2 border-red-600 flex  justify-center">
      <div className="border-2 border-yellow-500 w-[25vw] h-[5vh] flex items-center justify-center">
        <p className="text-white font-mono font-bold text-lg">Output</p>
      </div>
        {/* <p className="text-white font-serif text-base">{props.expr}</p> */}
    </div>
  );
};

export default Output;
