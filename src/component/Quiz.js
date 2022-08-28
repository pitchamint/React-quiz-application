import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import QuestionsData from "../data/QuestionsData";

const Quiz = () =>{
    //สร้าง state ขึ้นมาเพื่อเก็บลำดับในคำถาม 
    const [current,setCurrent] = useState(0) //ให้ค่าเริ่มต้นเป็น index 0
    //สร้าง state เพื่อเก็บตัวเลือกและแสดง event onclick แล้วดูว่าเขาเลือกถูกมั้ย
    const [selectChoice,setSelectChoice] = useState("") //selectChoice จะมีค่าก็ต่อเมื่อผู้ใช้ทำการคลิกตัวเลือก
    //สร้าง Context เพื่อเข้าถึง State เอามาคำนวณคะแนน
    const {score,setScore,setAppState} = useContext(DataContext)

    //ตรวจสอบความถูกต้องของคำถามโดยนำ selectChoice กับ answer มาเปรียบเทียบกัน
    useEffect(()=>{
        checkAnswer()
        // eslint-disable-next-line
    },[selectChoice])

    const checkAnswer=()=>{
        //เช็คคำตอบและใส่ระบบคะแนน
        if(selectChoice !== ""){
            if(selectChoice === QuestionsData[current].answer){
                setScore(score+1)
                nextQuiztion()
            }else{
                nextQuiztion()
            }
        }
    }

    //สร้างฟังก์ชั่นเพื่อที่จะให้ไปที่คำถามข้อต่อไป
    const nextQuiztion = () =>{
        //ต้องใส่ setSelectChoice เพราะ พอเรากดคำตอบข้อเดียวกันกับข้อก่อนหน้า คำถามมันไม่ไปข้อต่อไป เลยต้องเคลียร์ค่าออกก่อน
        setSelectChoice("")
        //ตรวจสอบข้อคำถามว่าไปถึงข้อสุดท้ายรึยัง
        if(current === QuestionsData.length-1){ //อยู่ในช่วง 0-4
            //เรียกใช้ setAppState เพื่อเปลี่ยนแปลงค่าใน State และนำไปใช้งานต่อในการสรุปผลคะแนน ใน Score Component และเรียกใช้ด้วยเลย
            setAppState("score")
        }else{
            setCurrent(current+1)
        }  
    }

    return(
        <div className="quiz">
            {/* เนื่องจากเราเก็บลำดับ(index)ไว้ที่ current แล้ว สามารถนำมาใส่ในช่อง []ได้เลย โดยใส่ key คือ question*/}
            <h1>{QuestionsData[current].question}</h1> 
            <div className="choices">
                <button onClick={()=>setSelectChoice("A")}>{QuestionsData[current].A}</button>
                <button onClick={()=>setSelectChoice("B")}>{QuestionsData[current].B}</button>
                <button onClick={()=>setSelectChoice("C")}>{QuestionsData[current].C}</button>
                <button onClick={()=>setSelectChoice("D")}>{QuestionsData[current].D}</button>
            </div>
            {/* แสดงลำดับคำถามที่เราทำอยู่ ต้อง +1 เพราะจะได้เริ่มต้นเป็นข้อที่ 1 / จำนวนคำถามทั้งหมด */}
            <p>{`${current+1} / ${QuestionsData.length}`}</p>
        </div>
    )
}
export default Quiz;