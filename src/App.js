import {createContext, useState} from "react"
import Menu from "./component/Menu";
import Quiz from "./component/Quiz";
import Score from "./component/Score";

import './App.css'

//สร้าง Context ขึ้นมาเพื่อให้เปลี่ยนแปลงค่าใน Stateได้ menu>quiz>score
export const DataContext = createContext()

function App() {
  //สร้าง state ขึ้นเพื่อจะให้แสดง Component ที่เราสร้างแยกไว้แต่ละอัน แต่เราจะแสดงทีละหน้า
  const [appState,setAppState] = useState("menu")
  //สร้าง State เพื่อทำระบบคะแนน และนำไปเรียกใช้งานใน QuizComponent
  const [score,setScore] = useState(0)
  return (
    //สร้าง DataContext เพื่อที่จะเอา State เข้าไปทำงานใน Componentย่อย ได้เราออยากเอา state ตัวไหนไปใช้ก็ต้องเพิ่มคำลงไปด้วย
    <DataContext.Provider value={{appState,setAppState,score,setScore}}> 
      <div className="App">
        <h1>Web Develorment Quiz</h1>
        {appState === "menu" && <Menu/>}
        {appState === "quiz" && <Quiz/>}
        {appState === "score" && <Score/>}
      </div>
    </DataContext.Provider>
  );
}

export default App;
