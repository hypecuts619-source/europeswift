import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <SEO 
        title="404 Not Found | SwiftCodeDir" 
        description="The page you are looking for could not be found." 
        robots="noindex" 
      />
      
      <h1 className="text-8xl font-black bg-gradient-to-r from-[#0B1C3D] to-[#003399] dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Page Not Found
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">
        The SWIFT code, routing number, or page you were looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button size="lg" className="gap-2 bg-[#003399] hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
          <Home className="w-4 h-4" />
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
