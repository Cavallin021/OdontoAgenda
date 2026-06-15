import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import logoBall from "../../public/LogoBolinha.png";

export default function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState("");

  const navigate = useNavigate();
  const { setToken } = useAuth();

  async function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!nickname.trim() || !password.trim()) {
      return;
    }

    setWrongPass("");

    try {
      const data = await login(nickname, password);
      setToken(data.access_token);

      navigate("/dashboard");
    } catch (e: any) {
      setWrongPass(e.message);
    }
  }

  const loginInput =
    "w-full bg-transparent border-b border-[#318d7f] py-2 px-1 outline-none placeholder:text-white/70 text-white focus:border-[#0fcbba] transition-all";

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#bbdcb] via-[#5bab9a] to-[#3f9691]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-10 flex flex-col items-center"
      >
        <div className="mb-6 text-[#bbdcb8]">
          {/* <img src={logoBall} className="w-20 h-20" /> */}
          <svg
            className="w-20 h-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-light tracking-widest text-white uppercase mb-12">
          Login
        </h1>

        <div className="w-full space-y-8">
          <div className="relative">
            <input
              className={loginInput}
              placeholder="Usuário"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              className={loginInput}
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.target.value);
                wrongPass ? setWrongPass("") : null;
              }}
            />
            {wrongPass && (
              <p className="text-red-600 text-sm mt-2 font-medium animate-pulse">
                {wrongPass}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex justify-between text-sm text-[#318d7f] mt-6 mb-10"></div>

        <button
          type="submit"
          className="w-full bg-[#318d7f] text-white py-4 rounded-sm font-semibold tracking-widest hover:bg-[#3f9691] shadow-lg transition-all uppercase"
        >
          Login
        </button>
      </form>
    </main>
  );
}
