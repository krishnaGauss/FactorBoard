import { Button } from "@/components/ui/button";
import { SWATCHES } from "@/constants";
import { CheckIcon, ColorSwatch, Group } from "@mantine/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Output from "./Output";

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
        ctx.lineWidth = 7;

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight - canvas.offsetTop;
        };
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }
  }, []);

  const sendData = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const URL = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.post(`${URL}/calculate`, {
          image: canvas.toDataURL("image/png"),
          dict_of_vars: dictOfVars,
        });

        const resp = response.data;
        console.log({ resp });

        const expressions = resp?.data?.[0]?.expr || "No expression available";
        const results = resp?.data?.[0]?.result || "No result available";

        console.log(`Expression: ${expressions}, Result: ${results}`);

        setResult({
          expression: expressions,
          answer: results,
        });
      } catch (error) {
        console.error("Error fetching calculation result:", error);
      }
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
    <div className="relative w-screen h-screen bg-black">
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute top-0 left-0 w-full h-full bg-black"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseOut={stopDrawing}
      />

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-4 items-center justify-center bg-gray-700 p-4 rounded-lg">
        <Button
          className="h-12 w-24 text-white bg-red-600 font-semibold text-base hover:bg-red-800 rounded-lg"
          onClick={() => setReset(true)}
        >
          Reset
        </Button>
        <div className="flex gap-2 items-center">
          <Group className="flex-wrap justify-center">
            {SWATCHES.map((colors) => (
              <ColorSwatch
                color={colors}
                key={colors}
                onClick={() => setColor(colors)}
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  border: colors === color ? "2px solid white" : "none",
                }}
              >
                {colors === color && <CheckIcon className="w-4 h-4" />}
              </ColorSwatch>
            ))}
          </Group>
        </div>
        <Button
          className="h-12 w-24 text-white bg-green-600 font-semibold text-base hover:bg-green-800 rounded-lg"
          onClick={sendData}
        >
          Calculate
        </Button>
      </div>
      {result && <Output res={result.answer} expr={result.expression} />}
    </div>
  );
};

export default Home;
