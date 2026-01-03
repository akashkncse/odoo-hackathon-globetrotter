import { useState } from "react";
import { Heart } from "lucide-react";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">Vite + React + Tailwind + DaisyUI</h1>
      <div className="card bg-base-200 shadow-xl p-6">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" />
          <button
            className="btn btn-primary"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </button>
        </div>
        <p className="mt-4 text-base-content">
          Edit{" "}
          <code className="bg-base-300 px-1 rounded">src/pages/Home.tsx</code>{" "}
          and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default Home;
