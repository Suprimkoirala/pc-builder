import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { CompatibilityResult, BuildCompatibilityResult } from '../types';

interface CompatibilityStatusProps {
  result: CompatibilityResult | BuildCompatibilityResult;
  showDetails?: boolean;
}

const CompatibilityStatus: React.FC<CompatibilityStatusProps> = ({ 
  result, 
  showDetails = false 
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'red':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'yellow':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green':
        return 'text-green-500';
      case 'red':
        return 'text-red-500';
      case 'yellow':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'green':
        return 'bg-green-500/20 border-green-500/30';
      case 'red':
        return 'bg-red-500/20 border-red-500/30';
      case 'yellow':
        return 'bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  // Single component compatibility
  if ('compatible' in result) {
    return (
      <div className={`flex items-center gap-2 p-2 rounded-lg border ${getStatusBg(result.status)}`}>
        {getStatusIcon(result.status)}
        <div className="flex-1">
          <div className={`font-medium ${getStatusColor(result.status)}`}>
            {result.compatible ? 'Compatible' : 'Incompatible'}
          </div>
          {showDetails && (
            <div className="text-sm text-gray-300 mt-1">
              {result.message}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Build compatibility
  return (
    <div className="space-y-3">
      <div className={`flex items-center gap-2 p-3 rounded-lg border ${getStatusBg(result.status)}`}>
        {getStatusIcon(result.status)}
        <div className="flex-1">
          <div className={`font-medium ${getStatusColor(result.status)}`}>
            {result.overall_compatible ? 'Build Compatible' : 'Build Incompatible'}
          </div>
          <div className="text-sm text-gray-300 mt-1">
                         {result.issues?.length || 0} issues, {result.warnings?.length || 0} warnings
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-2">
                     {result.issues && result.issues.length > 0 && (
            <div>
              <h4 className="text-red-400 font-medium mb-2">Issues:</h4>
              <div className="space-y-1">
                {result.issues.map((issue, index) => (
                  <div key={index} className="text-sm text-red-300 bg-red-500/10 p-2 rounded">
                    <div className="font-medium">{issue.component1} + {issue.component2}</div>
                    <div className="text-xs">{issue.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

                     {result.warnings && result.warnings.length > 0 && (
            <div>
              <h4 className="text-yellow-400 font-medium mb-2">Warnings:</h4>
              <div className="space-y-1">
                {result.warnings.map((warning, index) => (
                  <div key={index} className="text-sm text-yellow-300 bg-yellow-500/10 p-2 rounded">
                    <div className="font-medium">{warning.component1} + {warning.component2}</div>
                    <div className="text-xs">{warning.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompatibilityStatus; 