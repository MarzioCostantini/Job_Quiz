import "./QuizPage.css"
import { useContext, useEffect, useState } from "react";
import { RandomQuizContext } from "../../context/context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rQuestions } from "../../interfaces/Questions";
import Richtig from "../../components/RightWrong/Richtig";
import Falsch from "../../components/RightWrong/Falsch";


interface IPunktestand {
    richtig: number,
    falsch: number
}

const QuizPage = () => {
    const { randomQuiz } = useContext(RandomQuizContext)

    const [indexOfQuiz, setIndexOfQuiz] = useState<number>(0)
    const [currentQuizData, setCurrentQuizData] = useState<rQuestions | null>(null)
    const [right, setRight] = useState<string | null>(null)
    const [punktestand, setPunktestand] = useState<IPunktestand>({ richtig: 0, falsch: 0 })
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
    const [correctIndex, setCorrectIndex] = useState<number | null>(null);

    const { id } = useParams()
    const navigate = useNavigate()






    useEffect(() => {
        if (id) {
            let foundetObjekt = randomQuiz.find((item) => item.id == id)
            console.log("gefunden", foundetObjekt);
            if (foundetObjekt) {
                setCurrentQuizData(foundetObjekt || null)

            } else {
                console.log("Bitte fang von vorne an");
            }
        }

    }, [id])

    console.log(randomQuiz.length <= 0);


    // !NEustart bei undefinde
    useEffect(() => {
        if (randomQuiz.length <= 0) {
            navigate("/")
        }
    }, [
        randomQuiz
    ])


    // !Mischt die Fragen
    useEffect(() => {
        if (currentQuizData?.questions[indexOfQuiz]) {
            const choices = [...currentQuizData.questions[indexOfQuiz].choices];
            const correctAnswerText = choices[currentQuizData.questions[indexOfQuiz].correctAnswer];

            choices.forEach((_, i) => {
                const j = Math.floor(Math.random() * choices.length);
                [choices[i], choices[j]] = [choices[j], choices[i]];
            });

            setShuffledChoices(choices);
            setCorrectIndex(choices.indexOf(correctAnswerText));
        }
    }, [indexOfQuiz, currentQuizData]);




    // ! Validerung ob korrekt
    const checkIfRight = (index: number) => {
        setSelectedAnswer(index)

        if (index === correctIndex) {
            setRight("richtig")
            setPunktestand((prevState) => ({
                ...prevState,
                richtig: prevState.richtig + 1
            }))
        }
        else {
            setRight("falsch")
            setPunktestand((prevState) => ({
                ...prevState,
                falsch: prevState.falsch + 1
            }))
        }


    }

    console.log({ indexOfQuiz });


    const nextQuestion = () => {
        setIndexOfQuiz((prevCounter) =>
            prevCounter < 20 ? prevCounter + 1 : prevCounter
        )

        setRight(null)
        setSelectedAnswer(null)
    }



    return (
        <section className="quiz-question">
            {currentQuizData && indexOfQuiz < currentQuizData.questions.length ? (
                <>
                    <h3>{indexOfQuiz + 1} / {currentQuizData.questions.length}</h3>
                    <h1>{currentQuizData.questions[indexOfQuiz].question}</h1>
                    <div className="extra-info">
                        <p>{currentQuizData.questions[indexOfQuiz].category}</p>
                        <p>{currentQuizData.questions[indexOfQuiz].difficulty}</p>
                    </div>
                    <section className="choices">
                        {shuffledChoices.map((item, index) => (
                            <button
                                key={index}
                                className={
                                    selectedAnswer !== null
                                        ? index === correctIndex
                                            ? "right"
                                            : index === selectedAnswer
                                                ? "wrong"
                                                : ""
                                        : ""
                                }
                                disabled={right === "richtig" || right === "falsch"}
                                onClick={() => checkIfRight(index)}
                            >
                                {item}
                            </button>
                        ))}
                    </section>

                    {right === "richtig" ? (
                        <Richtig
                            antwort={
                                currentQuizData.questions[indexOfQuiz].explanation ||
                                "Keine Erklärung vorhanden"
                            }
                        />
                    ) : right === "falsch" ? (
                        <Falsch
                            antwort={
                                currentQuizData.questions[indexOfQuiz].explanation ||
                                "Keine Erklärung vorhanden"
                            }
                        />
                    ) : null}

                    <button className="btn" disabled={right === null} onClick={() => nextQuestion()}>
                        Nächste
                        <svg width="36" height="31" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.6578 32.1509C27.2936 32.1509 26.9295 32.0313 26.642 31.7751C26.0861 31.2797 26.0861 30.4597 26.642 29.9642L37.2603 20.5001L26.642 11.0359C26.0861 10.5405 26.0861 9.72049 26.642 9.22508C27.1978 8.72966 28.1178 8.72966 28.6736 9.22508L40.3078 19.5947C40.8636 20.0901 40.8636 20.9101 40.3078 21.4055L28.6736 31.7751C28.3861 32.0313 28.022 32.1509 27.6578 32.1509Z" fill="#5D3EDE" />
                            <path d="M38.9658 21.7812H6.70825C5.92242 21.7812 5.27075 21.2004 5.27075 20.5C5.27075 19.7996 5.92242 19.2188 6.70825 19.2188H38.9658C39.7516 19.2188 40.4033 19.7996 40.4033 20.5C40.4033 21.2004 39.7516 21.7812 38.9658 21.7812Z" fill="#5D3EDE" />
                        </svg>
                    </button>
                </>
            ) : (
                <div className="done">
                    <h2>Das Quiz ist zu Ende</h2>
                    <p>Du hast insgesamt 20 Fragen beantwortet, davon waren {punktestand.richtig} richtig und {punktestand.falsch} falsch.</p>

                    <Link to="/" className="btn">Zurück</Link>
                </div>
            )}
        </section>
    );
}

export default QuizPage;