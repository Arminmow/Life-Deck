
import "./App.css";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

function App() {
  return (
    <>  
      <motion.div 
        className="inline-block"
        animate= {{scale: [1,2,1]}}
        transition={{repeat: Infinity, duration: 1.5 , ease: "linear"}}
      >
        <Button>ShadCN + Framer Motion</Button>
      </motion.div>
    </>
  );
}

export default App;
