import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (mode !== 'forgot' && !password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    onAuthenticated({
      name: name || 'Alex Rivera',
      email: email
    });
    onClose();
  };

  const handleQuickDemo = () => {
    onAuthenticated({
      name: 'Alex Rivera',
      email: 'alex@creatorhub.demo'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#0e111d] p-6 shadow-2xl text-left font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">
              {mode === 'signup' ? 'Create CreatorHub Account' : mode === 'login' ? 'Welcome Back, Creator' : 'Reset Password'}
            </h3>
            <p className="text-xs text-slate-400 leading-tight">
              {mode === 'signup' ? 'One operating system for your entire creator workflow.' : 'Sign in to access your command center.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 p-2.5 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Creator / Brand Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                placeholder="creator@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[10.5px] text-cyan-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:opacity-95 active:scale-[0.98] transition-all"
          >
            <span>{mode === 'signup' ? 'Complete Sign Up' : mode === 'login' ? 'Sign In to Workspace' : 'Send Reset Link'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[10px] text-slate-500 uppercase">Or test immediately</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleQuickDemo}
          className="w-full rounded-xl border border-cyan-500/30 bg-cyan-500/10 py-2 px-3 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition flex items-center justify-center gap-2"
        >
          <Zap className="h-3.5 w-3.5" />
          <span>Launch with Demo Creator Profile (Alex Rivera)</span>
        </button>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          {mode === 'signup' ? (
            <span>Already have an account? <button onClick={() => setMode('login')} className="text-cyan-400 hover:underline font-semibold">Sign in</button></span>
          ) : (
            <span>New to CreatorHub? <button onClick={() => setMode('signup')} className="text-cyan-400 hover:underline font-semibold">Create account</button></span>
          )}
          <span className="flex items-center gap-1 text-[10.5px] text-slate-500">
            <ShieldCheck className="h-3 w-3 text-emerald-400" /> OAuth 2.0
          </span>
        </div>
      </div>
    </div>
  );
};
