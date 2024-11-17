import { useRef, useState } from "react"
import { Button } from "../components/ui/button"

const TopBar = () => {
    const [reset, setReset] = useState(false);

  return (
    <div>
      <div className="flex space-x-4 px-2 p-1 ">
        <Button className="h-12 w-24 text-white bg-red-600 font-semibold text-base hover:bg-red-800 rounded-lg" onClick={()=>setReset(true)}>Reset</Button>
        <Button className="h-12 w-24 text-white bg-green-600 font-semibold text-base hover:bg-green-800 rounded-lg">Calculate</Button>
        
      </div>
    </div>
  )
}

export default TopBar
