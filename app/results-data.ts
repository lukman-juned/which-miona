// ============================================================
// EDIT YOUR RESULTS HERE
// Put result images in the /public/results/ folder
// e.g. public/results/soft.png → image: "/results/soft.png"
// ============================================================

export type Result = {
  key: string;
  title: string;
  desc: string;
  image: string;
};

export const results: Result[] = [
  {
    key: "soft",
    title: "Soft Miona 🌸",
    desc: "Gentle & comforting",
    image: "/results/soft.png",
  },
  {
    key: "chaotic",
    title: "Chaotic Miona 🔥",
    desc: "Fun & unpredictable",
    image: "/results/chaotic.png",
  },
  {
    key: "sleepy",
    title: "Sleepy Miona 😴",
    desc: "Loves comfort",
    image: "/results/sleepy.png",
  },
  {
    key: "cool",
    title: "Cool Miona 🖤",
    desc: "Calm & mysterious",
    image: "/results/cool.png",
  },
];
