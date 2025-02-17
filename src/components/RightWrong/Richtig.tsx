import "./Richitg.css"

interface RPorps {
    antwort: string | undefined
}

const Richtig: React.FC<RPorps> = ({ antwort }) => {
    return (<div className="richtig">
        <svg width="48" height="47" viewBox="0 0 48 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 3.91663C12.98 3.91663 4 12.7095 4 23.5C4 34.2904 12.98 43.0833 24 43.0833C35.02 43.0833 44 34.2904 44 23.5C44 12.7095 35.02 3.91663 24 3.91663ZM33.56 18.9958L22.22 30.0995C21.94 30.3737 21.56 30.5304 21.16 30.5304C20.76 30.5304 20.38 30.3737 20.1 30.0995L14.44 24.5575C13.86 23.9895 13.86 23.0495 14.44 22.4816C15.02 21.9137 15.98 21.9137 16.56 22.4816L21.16 26.9858L31.44 16.92C32.02 16.352 32.98 16.352 33.56 16.92C34.14 17.4879 34.14 18.4083 33.56 18.9958Z" fill="white" />
        </svg>

        <p>{antwort}</p>

    </div>);
}

export default Richtig;