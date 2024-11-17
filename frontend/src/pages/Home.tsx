import { useRef } from "react";
import TopBar from "./TopBar"

const Home = () => {
    const canvasRef=useRef<HTMLCanvasElement>(null);

  return (
    <div>
        <TopBar/>

        <canvas ref={canvasRef} className="top-0 absolute w-full h-screen border-2 border-red-600"/>

    </div>
  )
}

export default Home