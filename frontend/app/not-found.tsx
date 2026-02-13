import Link from "next/link";
import { Home, Bot } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-bold text-indigo-500 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/clients"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Bot className="w-5 h-5" />
            Client Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
