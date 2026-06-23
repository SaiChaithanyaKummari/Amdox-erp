import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import api from "../../lib/api.js";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
    try {
      await api.post('/auth/forgot-password', { email: values.email });
      toast.success('Password reset link sent to your email');
      navigate('/login');
    } catch (err) {
      console.error('Forgot password error:', err);
      toast.error(err?.response?.data?.message || 'Failed to send reset link');
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 dark:bg-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl sm:p-10 dark:border-slate-800 dark:bg-slate-900/80">
          <Link
            to="/login"
            className="erp-focus inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-primary dark:text-slate-400"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>

          <div className="mt-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FiMail className="h-8 w-8" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">Forgot password?</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          <label className="mt-8 block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
            <span className="relative mt-2 block">
              <FiMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                className="erp-focus h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </span>
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="erp-focus mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Remember your password?{" "}
            <Link to="/login" className="font-bold text-primary hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
