import { useContext } from "react";
import { DataContext } from "../App";

const Menu = () =>{
    //เรียกใช้ Context เพื่อจะเอา state จาก App.js มาใช้
    const {setAppState} = useContext(DataContext)
    return(
        <div className="menu">
            <h1>Quiz Quiz</h1>
            <button onClick={() => setAppState("quiz")}>Start Quiz</button>
        </div>
    )
}

export default Menu