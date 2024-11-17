import { Button } from "@/components/ui/button";
import { SWATCHES } from "@/constants";
import { CheckIcon, ColorSwatch, Group } from "@mantine/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaEyeDropper } from "react-icons/fa";

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}

interface GeneratedResult {
  expression: string;
  answer: string;
}

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const [reset, setReset] = useState(false);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<GeneratedResult>();
  const [dictOfVars, setDictOfVars] = useState({});

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  useEffect(() => {
    if (reset) {
      resetCanvas();
      // setLatexExpression([]);
      setResult(undefined);
      setDictOfVars({});
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineCap = "round";
        ctx.lineWidth = 5;
      }
    }
  }, []);

  const sendData = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${URL}/calculate`, {
        image: canvas.toDataURL("image/png"),
        dict_of_vars: dictOfVars,
      });

      const resp = await response.data;
      console.log(resp);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <>
      <div className="flex gap-20 px-2 p-1 bg-slate-700">
        <Button
          className="h-12 w-24 text-white bg-red-600 font-semibold text-base hover:bg-red-800 rounded-lg"
          onClick={() => setReset(true)}
        >
          Reset
        </Button>
        <div className="flex gap-2 rounded-lg w-50">
          <Group className="z-20">
            {SWATCHES.map((colors) => {
              return (
                <ColorSwatch
                  color={colors}
                  key={colors}
                  onClick={() => {
                    setColor(colors);
                    setChecked((c) => !c);
                  }}
                  style={{ color: "#fff", cursor: "pointer" }}
                >
                  {checked && colors === color && (
                    <CheckIcon className="w-4 h-4" />
                  )}
                </ColorSwatch>
              );
            })}
          </Group>
        </div>
        <Button
          className="h-12 w-24 text-white bg-green-600 font-semibold text-base hover:bg-green-800 rounded-lg"
          onClick={sendData}
        >
          Calculate
        </Button>
        </div>
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute left-0 w-full h-[92.2vh] bg-black"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseOut={stopDrawing}
        />
    </>
  );
};

export default Home;
