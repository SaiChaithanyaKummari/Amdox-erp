import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "../../stores/useAuthStore.js";
import { toast } from "sonner";
import logo from "../../assets/logo.png";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: 'admin@amdoxerp.com', password: 'enterprise' }
  });

  async function onSubmit(values) {
    try {
      console.log('Logging in with:', values);
      const res = await login(values);
      toast.success('Signed in');

      // Determine user role and redirect to their layout
      const loggedInUser = res?.data?.user || useAuthStore.getState().user;
      const role = loggedInUser?.role?.toLowerCase() || 'admin';

      let dest = `/${role}/dashboard`;
      if (from && from !== '/' && from !== '/admin/dashboard') {
        const pathPrefix = from.split('/')[1] || '';
        if (pathPrefix.toLowerCase() === role) {
          dest = from;
        }
      }

      navigate(dest, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err?.message || 'Sign in failed');
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-soft backdrop-blur-xl md:grid-cols-[0.95fr_1.05fr] dark:border-slate-800 dark:bg-slate-900/75">
          <div className="hidden bg-secondary p-10 text-white md:flex md:flex-col md:justify-between">
            <div className="flex flex-col items-center">
              <h1 className="mt-8 text-3xl font-bold text-center">AMDOX ERP System</h1>
              <img
                src={logo}
                alt="AMDOX ERP Logo"
                className="mt-8 w-1/2 aspect-square rounded-3xl object-cover shadow-2xl border border-white/10"
              />
            </div>
            <p className="text-center text-xs text-slate-400">Secure enterprise workspace</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Welcome back</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">Sign in</h2>


            <label className="mt-8 block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
              <span className="relative mt-2 block">
                <FiMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  {...register('email')}
                  className="erp-focus h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </span>
              {errors.email ? <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p> : null}
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Password</span>
              <span className="relative mt-2 block">
                <FiLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password')}
                  className="erp-focus h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </span>
              {errors.password ? <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p> : null}
              <div className="mt-2 flex justify-end">
                <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="erp-focus mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Sign in
              <FiArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Need an account?{' '}
              <Link to="/register" className="font-bold text-primary hover:text-blue-700">
                Register
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
