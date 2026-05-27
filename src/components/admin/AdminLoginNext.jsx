"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Compass, Mail, Lock, LogIn, Info } from "lucide-react";

export default function AdminLoginNext() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText(null);

    if (!email || !password) {
      setErrorText("Please enter both your login email and workspace password.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setErrorText("Invalid administrative credentials.");
      } else if (result?.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorText("Unrecognized login response format.");
      }
    } catch (err) {
      console.error("Admin Login Failure:", err);
      setErrorText("Error occurred signing in. Please check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white border border-slate-200/65 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-amber-500 shadow-md">
              <Compass className="h-6 w-6 animate-spin" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Portal Sign In</h1>
            <p className="text-xs text-slate-500 font-mono">CONFIDENTIAL ADMINISTRATIVE INTERFACE</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input id="login-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@campervanbigbear.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-slate-900 placeholder-slate-400" />
              </div>
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-slate-900 placeholder-slate-400" />
              </div>
            </div>
            {errorText && (
              <div className="text-xs bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg font-medium leading-normal">{errorText}</div>
            )}
            <button id="admin-login-submit" type="submit" disabled={isLoading} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer disabled:bg-slate-400">
              {isLoading ? <span>Verifying Account...</span> : <><LogIn className="h-4 w-4" /><span>Authenticate Session</span></>}
            </button>
          </form>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-2.5 text-xs text-amber-900 leading-normal">
            <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Handoff Credentials:</span>
              <ul className="mt-1 font-mono text-[10px] space-y-0.5">
                <li>Email: <code className="font-bold select-all bg-amber-100 px-1 rounded">admin@campervanbigbear.com</code></li>
                <li>Pass: <code className="font-bold select-all bg-amber-100 px-1 rounded">BigBear@Admin2024</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
