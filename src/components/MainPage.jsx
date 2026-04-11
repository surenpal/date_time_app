import { Calendar } from "./Calendar";

export const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] p-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 shadow-2xl shadow-black/60">
        <Calendar />
      </div>
    </div>
  );
};
