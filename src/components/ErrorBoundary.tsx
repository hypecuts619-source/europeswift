import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Uncaught runtime error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 text-red-900 p-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Application Crash</h1>
          <p className="mb-4">An unexpected runtime error occurred.</p>
          <pre className="bg-white p-4 rounded text-left overflow-auto max-w-4xl shadow-sm border border-red-200">
            {this.state.error?.stack || this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
