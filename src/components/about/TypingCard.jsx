import { useEffect, useState } from "react";

export default function TypingCard() {
  const [text, setText] = useState("");

  useEffect(() => {
    const lines = [
      "$ stack --list",
      "Frontend: React.js, JavaScript (ES6+), Tailwind CSS",
      "Backend: Node.js, Express.js, REST APIs",
      "Database: MongoDB, Mongoose ODM",
      "Auth: JWT, bcrypt, OTP flows",
      "Tools: Git, GitHub, Postman, Vercel",
    ];
    const full = lines.join("\n");
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) window.clearInterval(t);
    }, 18);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative mt-6">
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#93c5fd]">
        <span className="text-emerald-400">{text}</span>
        <span className="ml-1 inline-block h-[14px] w-[8px] translate-y-[2px] bg-emerald-400/80" />
      </pre>
    </div>
  );
}
