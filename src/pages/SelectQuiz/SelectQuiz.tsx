import { useNavigate } from "react-router-dom"
import "./SelectQuiz.css"
import { useContext, useState } from "react";
import LoadingQuiz from '../../components/LoadQuiz/LoadQuiz';
import { RandomQuizContext } from "../../context/context";
import { fetchData } from "../../units/FetchData";
import { v4 as uuidv4 } from 'uuid';
import { Frontend } from "../../interfaces/Questions";


const SelectQuiz = () => {
    const [loading, setLoading] = useState(false)
    const { randomQuiz, setRandomQuiz } = useContext(RandomQuizContext)

    const navigate = useNavigate()

    const loadQuestions = (fragenTyp: string) => {
        let twentyRandomQuestions: Frontend[] = []

        const runden = 20;

        setLoading(true);

        const fetchQuizData = async () => {
            if (fragenTyp) {
                const id = uuidv4()

                try {
                    const data = await fetchData(
                        "https://raw.githubusercontent.com/MarzioCostantini/Quiz_Data_Api/refs/heads/main/quiz_data.json"
                    );


                    // Solange wir weniger als 20 Fragen haben, weiter generieren
                    while (twentyRandomQuestions.length < runden) {
                        // Generiere eine zufällige Frage

                        // checkt auf was geklickt ist
                        let thema = fragenTyp === "frontend" ? "Frontend" : "UI/UX"

                        // selectiert random item vin array
                        let srqIndex = Math.floor(Math.random() * data[thema].length);
                        let randomQuestion = data[thema][srqIndex];



                        // Überprüfen, ob die ID bereits in twentyRandomQuestions existiert
                        let exists = twentyRandomQuestions.some(
                            (question) => question.id === randomQuestion.id
                        );

                        if (!exists) {
                            twentyRandomQuestions.push(randomQuestion);
                        } else {
                            console.log("Frage mit dieser ID ist schon drinnen :-(((");
                        }
                    }

                    // Erstellt ein Objetk
                    let objectRandom20 = {
                        id: id,
                        questions: twentyRandomQuestions
                    }

                    setRandomQuiz([...randomQuiz, objectRandom20]);
                } catch (error) {
                    console.error("Fehler beim Laden der Daten:", error);
                } finally {
                    const timeout = setTimeout(() => {
                        setLoading(false);
                        navigate(`/quiz/${fragenTyp}/${id}`)
                    }, 2000);

                    return () => clearTimeout(timeout);
                }
            };
        }


        fetchQuizData();
    };

    return (

        <section className="select-q">
            {loading && <LoadingQuiz />}
            <h1>SuperCode Job Quiz Interviewfragen</h1>
            <p className="text">Finde heraus, wie fit du für potenzielle Job-Interviewfragen bist.</p>

            <article>
                <div onClick={() => loadQuestions("frontend")}>
                    <p>Zum <br /> Frontend <br /> Quiz</p>
                </div>
                <div onClick={() => loadQuestions("uiux")}>
                    <p>Zum <br /> UI/UX <br /> Quiz</p>
                </div>
            </article>
        </section>
    );
}

export default SelectQuiz;