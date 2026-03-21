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
  { q: "You wake up late. What do you do?",   a: ["Rush in chaos", "Stay calm"],          scores: [1, 3] },
  { q: "Pick a vibe",                          a: ["Soft & Cozy", "Bold & Chaotic"],       scores: [0, 1] },
  { q: "Your ideal weekend plan?",             a: ["Stay in bed all day", "Go out and explore"], scores: [2, 1] },
  { q: "Favorite food?",                       a: ["Sweet desserts", "Savory snacks"],     scores: [0, 3] },
  { q: "In group, you are...",                 a: ["Listener", "Talker"],                  scores: [2, 1] },
  { q: "Your texting style?",                  a: ["Short & on point", "Long & expressive"], scores: [3, 0] },
  { q: "How you handle conflict?",             a: ["Avoid it", "Face it head on"],         scores: [2, 3] },
  { q: "Your energy level",                    a: ["Low", "High"],                         scores: [2, 1] },
  { q: "Your favorite time",                   a: ["Night", "Morning"],                    scores: [3, 0] },
  { q: "What do you prefer",                   a: ["Thorough planning", "Spontaneus"],     scores: [0, 1] },
  { q: "Aesthetic?",                           a: ["Cute", "Dark"],                        scores: [0, 3] },
  { q: "How do you relax?",                    a: ["Sleep", "Scroll endlessly"],           scores: [2, 1] },
];


export default function Page() {
  const [started, setStarted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [score, setScore] = useState<number[]>([0, 0, 0, 0]);
  const [done, setDone] = useState<boolean>(false);

  const handleAnswer = (i: number) => {
    const newScore = [...score];
    newScore[questions[step].scores[i]]++;
    setScore(newScore);

    if (step + 1 < questions.length) setStep(step + 1);
    else setDone(true);
  };

  const getResult = (): Result => {
    const max = Math.max(...score);
    return results[score.indexOf(max)];
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
          <button className="start-btn" onClick={() => setStarted(true)}>Start</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      {!done ? (
        <div className="card">
          <h2>{step + 1}. {questions[step].q}</h2>
          {questions[step].a.map((ans, i) => (
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