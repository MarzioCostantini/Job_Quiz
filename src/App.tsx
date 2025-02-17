
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import SelectQuiz from './pages/SelectQuiz/SelectQuiz'
import QuizDone from './pages/QuizDone/QuizDone'
import QuizPage from './pages/QuizPage/QuizPage'
import { useState } from 'react'
import { rQuestions } from './interfaces/Questions'
import { RandomQuizContext } from './context/context'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<SelectQuiz />} />
      <Route path='/quiz/:theme/:id' element={<QuizPage />} />
      <Route path='/quiz/done' element={<QuizDone />} />
    </>
  )
)


function App() {
  const [randomQuiz, setRandomQuiz] = useState<rQuestions[]>([])

  console.log("randommm", randomQuiz);


  return (
    <div className='quiz'>
      <RandomQuizContext value={{ randomQuiz, setRandomQuiz }}>
        <RouterProvider router={router} />
      </RandomQuizContext>
    </div>

  )
}

export default App
