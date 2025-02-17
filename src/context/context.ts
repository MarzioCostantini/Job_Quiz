import { createContext } from "react"
import { rQuestions } from "../interfaces/Questions"

// ! Warenkorb
interface IquizData {
    randomQuiz: rQuestions[],
    setRandomQuiz: React.Dispatch<React.SetStateAction<rQuestions[]>>
}

export const RandomQuizContext = createContext<IquizData>(null!)