import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Package, DollarSign, Calendar } from 'lucide-react';
import type { Build } from '../types';
import { publicBuildAPI } from '../services/api';

const PastBuilds = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPublicBuilds();
  }, []);

  const loadPublicBuilds = async () => {
    try {
      setLoading(true);
      const publicBuilds = await publicBuildAPI.getAll();
      setBuilds(publicBuilds);
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section id="past-builds" className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Community Builds
          </h2>
          <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
            Explore amazing PC builds created by our community. Get inspired and share your own creations!
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-white text-lg">Loading community builds...</div>
          </div>
        ) : builds.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-white text-lg mb-2">No public builds yet</div>
            <div className="text-emerald-200">Be the first to create and share a build!</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Card
                key={build.id}
                className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {build.name}
                      </h3>
                      <p className="text-emerald-200 text-sm">
                        {build.description}
                      </p>
                    </div>
                                         <div className="flex items-center gap-1 text-emerald-400">
                       <DollarSign className="w-4 h-4" />
                       <span className="font-bold">
                         {Number(build.total_price || 0).toFixed(2)}
                       </span>
                     </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Package className="w-4 h-4" />
                        <span>Components</span>
                      </div>
                                             <span className="text-emerald-400 font-medium">
                         {build.components.length}
                       </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>Created</span>
                      </div>
                      <span className="text-emerald-400">
                        {formatDate(build.created)}
                      </span>
                    </div>
                  </div>

                                     {build.components.length > 0 && (
                    <div className="border-t border-white/20 pt-4">
                      <h4 className="text-white font-medium mb-2">Key Components</h4>
                      <div className="space-y-1">
                        {build.components.slice(0, 3).map((component, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300 truncate">
                              {component.component_name}
                            </span>
                                                         <span className="text-emerald-400">
                               ${Number(component.component_price || 0).toFixed(2)}
                             </span>
                          </div>
                        ))}
                                                 {build.components.length > 3 && (
                          <div className="text-xs text-gray-400">
                                                         +{build.components.length - 3} more components
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-emerald-900"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            className="bg-emerald-400 hover:bg-emerald-500 text-emerald-900 font-semibold px-8 py-3"
            onClick={() => {
              const builderSection = document.getElementById('builder');
              if (builderSection) {
                builderSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Create Your Own Build
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PastBuilds;
