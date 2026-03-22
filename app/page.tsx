"use client";
import { useState } from "react";
import { results, type Result } from "./results-data";

// Result index: 0 = soft, 1 = chaotic, 2 = sleepy, 3 = cool
type Question = {
  q: string;
  a: string[];
  scores: number[]; // one score index per answer
};

const questions: Question[] = [
  { q: "You wake up late. What do you do?",    a: ["Rush in chaos", "Stay calm", "Cuddle Isami"],               scores: [1, 3, 4] },
  { q: "Pick a vibe",                          a: ["Soft & Cozy", "Bold & Chaotic", "Isami simp"],              scores: [0, 1, 4] },
  { q: "Your ideal weekend plan?",             a: ["Stay in bed all day", "Go out and explore", "With Isami"],  scores: [2, 1, 4] },
  { q: "Favorite food?",                       a: ["Sweet desserts", "Savory snacks", "Isami"],                 scores: [0, 3, 4] },
  { q: "In group, you are...",                 a: ["Listener", "Talker", "Missing Isami"],                      scores: [2, 1, 4] },
  { q: "Your texting style?",                  a: ["Short & on point", "Long & expressive", "Lovebomb Isami"],  scores: [3, 0, 4] },
  { q: "How you handle conflict?",             a: ["Avoid it", "Face it head on", "Call Isami"],                scores: [2, 3, 4] },
  { q: "Your energy level",                    a: ["Low", "High", "Isami’s"],                                   scores: [2, 1, 4] },
  { q: "Your favorite time",                   a: ["Night", "Morning", "Isami time"],                           scores: [3, 0, 4] },
  { q: "What do you prefer",                   a: ["Thorough planning", "Spontaneus", "Isami"],                 scores: [0, 1, 4] },
  { q: "Aesthetic?",                           a: ["Cute", "Dark", "Isami’s"],                                  scores: [0, 3, 4] },
  { q: "How do you relax?",                    a: ["Sleep", "Scroll endlessly", "Seduce Isami"],                scores: [2, 1, 4] },
];


const SPECIAL_NAMES = ["miona", "mimi", "miomio", "mio"];
const ISAMI_THRESHOLD = 3;

export default function Page() {
  const [name, setName] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [score, setScore] = useState<number[]>([0, 0, 0, 0, 0]);
  const [done, setDone] = useState<boolean>(false);

  const isSpecial = SPECIAL_NAMES.includes(name.trim().toLowerCase());

  const handleAnswer = (i: number) => {
    const newScore = [...score];
    newScore[questions[step].scores[i]]++;
    setScore(newScore);

    if (step + 1 < questions.length) setStep(step + 1);
    else setDone(true);
  };

  const getResult = (): Result => {
    if (score[4] >= ISAMI_THRESHOLD) return results.find(r => r.key === "isami")!;
    const topScore = score.slice(0, 4);
    const max = Math.max(...topScore);
    return results[topScore.indexOf(max)];
  };

  const result = done ? getResult() : null;

  const handleDownload = async (image: string, key: string) => {
    const res = await fetch(image);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${key}-miona.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (!started) {
    return (
      <div className="landing-page">
        <video className="landing-video" autoPlay loop muted playsInline>
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="landing-content">
          <input
            className="name-input"
            type="text"
            maxLength={10}
            placeholder="write your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button
            className="start-btn"
            onClick={() => setStarted(true)}
            disabled={name.trim() === ""}
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  const visibleAnswers = isSpecial
    ? questions[step].a
    : questions[step].a.slice(0, 2);

  return (
    <div className="page">
      {!done ? (
        <div className="card">
          <h2>{step + 1}. {questions[step].q}</h2>
          {visibleAnswers.map((ans, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="answer-btn"
            >
              {ans}
            </button>
          ))}
        </div>
      ) : (
        <div className="result">
          <h1>{result!.title}</h1>
          <img src={result!.image} />
          <p>{result!.desc}</p>

          <button
            className="download-btn"
            onClick={() => handleDownload(result!.image, result!.key)}
          >
            Download Result
          </button>
        </div>
      )}
    </div>
  );
}