import { CirclePlus } from "lucide-react";
import "../global.css";
import Recorder from "../../components/Recorder";
import Login from "../../components/auth/login";
import { useEffect, useState } from "react";

export const Popup = () => {
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div>
      <article className="border-b font-semibold p-4 flex gap-4 items-center border-slate-400">
        <img
          alt="Speakio Logo"
          src="/icon48.png"
        />
        Voice Notes for all your sites
      </article>

      {/* List of recordings */}
      <article className="flex flex-col gap-4 w-full justify-center items-center my-12">
        {
          error ?
          <h2 className="text-red-600">{error}</h2> :
          recordings.length > 0 ?
          <h2>Hello</h2> :
          <article className="flex flex-col w-full h-full gap-2 items-center justify-center">
            <h2 className="text-xl font-semild text-slate-400">No recordings for this site</h2>
            <Recorder />
          </article>
        }
      </article>

    </div>
  );
};

