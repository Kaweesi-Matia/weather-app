import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-center gap-4 max-w-md mx-auto">
      <div className="bg-red-100 p-3 rounded-full">
        <AlertCircle className="w-6 h-6 text-red-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 mb-1">Error</h3>
        <p className="text-red-700 text-sm">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
