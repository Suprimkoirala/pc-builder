import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Log error silently in production
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-900 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
            <p className="mb-4">The application encountered an error.</p>
            <button
              className="bg-white text-red-900 px-4 py-2 rounded"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer">Error Details</summary>
                <pre className="mt-2 text-sm bg-red-800 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 