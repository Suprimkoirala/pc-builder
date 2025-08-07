import React from 'react';
import { 
  Cpu, 
  Monitor, 
  Settings, 
  Zap, 
  Package, 
  HardDrive, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Play,
  BookOpen,
  Lightbulb,
  Shield,
  Clock,
  DollarSign,
  ArrowDown
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const Guide: React.FC = () => {
  return (
    <section className="px-6 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            PC Building Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master the art of building your dream PC with our comprehensive guide. 
            Learn component selection, compatibility, and get expert tips from the pros.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card 
            className="bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300 cursor-pointer transform"
            onClick={() => {
              document.getElementById('component-selection')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Component Selection</h3>
              <p className="text-gray-300 text-sm">Learn how to choose the right components for your build</p>
              <ArrowDown className="w-5 h-5 text-emerald-400 mx-auto mt-3 opacity-60" />
            </div>
          </Card>
          
          <Card 
            className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer transform"
            onClick={() => {
              document.getElementById('compatibility-guide')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="p-6 text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Compatibility</h3>
              <p className="text-gray-300 text-sm">Understand how compatibility checking works</p>
              <ArrowDown className="w-5 h-5 text-blue-400 mx-auto mt-3 opacity-60" />
            </div>
          </Card>
          
          <Card 
            className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer transform"
            onClick={() => {
              document.getElementById('video-guides')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="p-6 text-center">
              <Play className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Video Guides</h3>
              <p className="text-gray-300 text-sm">Watch expert tutorials and build guides</p>
              <ArrowDown className="w-5 h-5 text-purple-400 mx-auto mt-3 opacity-60" />
            </div>
          </Card>
        </div>

        {/* Component Selection Guide */}
        <div id="component-selection" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How to Select Components
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Step-by-Step Process */}
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Process</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Start with the Case</h4>
                        <p className="text-gray-300 text-sm">Choose your PC case first as it determines the form factor and size constraints for other components.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Select CPU & Motherboard</h4>
                        <p className="text-gray-300 text-sm">Choose a CPU, then find a compatible motherboard with the same socket type.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Add RAM & Storage</h4>
                        <p className="text-gray-300 text-sm">Select RAM compatible with your motherboard and storage drives for your needs.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        4
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Choose GPU & PSU</h4>
                        <p className="text-gray-300 text-sm">Select a graphics card that fits your case and a power supply with sufficient wattage.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        5
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Add Cooling</h4>
                        <p className="text-gray-300 text-sm">Choose CPU cooling that fits your case and provides adequate thermal performance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Component Categories */}
            <div className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Component Categories</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <Package className="w-6 h-6 text-emerald-400" />
                      <div>
                        <h4 className="text-white font-medium">Case</h4>
                        <p className="text-gray-300 text-xs">Determines form factor and size constraints</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <Cpu className="w-6 h-6 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium">CPU</h4>
                        <p className="text-gray-300 text-xs">Brain of your computer, determines socket type</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <Settings className="w-6 h-6 text-purple-400" />
                      <div>
                        <h4 className="text-white font-medium">Motherboard</h4>
                        <p className="text-gray-300 text-xs">Must match CPU socket and case form factor</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <Monitor className="w-6 h-6 text-red-400" />
                      <div>
                        <h4 className="text-white font-medium">GPU</h4>
                        <p className="text-gray-300 text-xs">Graphics card, must fit in case and PSU can power it</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <div>
                        <h4 className="text-white font-medium">Power Supply</h4>
                        <p className="text-gray-300 text-xs">Must provide enough power for all components</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <HardDrive className="w-6 h-6 text-green-400" />
                      <div>
                        <h4 className="text-white font-medium">RAM & Storage</h4>
                        <p className="text-gray-300 text-xs">Memory and storage for your system</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Compatibility Guide */}
        <div id="compatibility-guide" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How Compatibility Works
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compatibility Rules */}
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Compatibility Rules</h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="text-white font-medium">CPU ↔ Motherboard</h4>
                      <p className="text-gray-300 text-sm">Socket types must match (e.g., LGA1700, AM5)</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-white font-medium">GPU ↔ Case</h4>
                      <p className="text-gray-300 text-sm">GPU length must fit within case maximum</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="text-white font-medium">CPU Cooler ↔ Case</h4>
                      <p className="text-gray-300 text-sm">Cooler height must fit within case clearance</p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="text-white font-medium">Motherboard ↔ Case</h4>
                      <p className="text-gray-300 text-sm">Form factor must match (ATX, ITX, etc.)</p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="text-white font-medium">GPU ↔ Power Supply</h4>
                      <p className="text-gray-300 text-sm">PSU must provide enough power for GPU</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Compatibility Indicators */}
            <div className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Understanding Indicators</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-white font-medium">Compatible</h4>
                        <p className="text-gray-300 text-sm">Component will work with your current build</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <XCircle className="w-5 h-5 text-red-400" />
                      <div>
                        <h4 className="text-white font-medium">Incompatible</h4>
                        <p className="text-gray-300 text-sm">Component may not work with your build</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <div>
                        <h4 className="text-white font-medium">Warning</h4>
                        <p className="text-gray-300 text-sm">Potential compatibility issue detected</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <h4 className="text-white font-medium mb-2">💡 Pro Tip</h4>
                    <p className="text-gray-300 text-sm">
                      Use the "Show Only Compatible" filter to narrow down your options and avoid compatibility issues.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Video Guides */}
        <div id="video-guides" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Expert Video Guides
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Linus Tech Tips */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-red-400" />
                  Linus Tech Tips
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/v7MYOpFONCU"
                      title="How to Build a PC - Step by Step"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Complete step-by-step guide to building your first PC from the experts at Linus Tech Tips.
                  </p>
                </div>
              </div>
            </Card>

            {/* Paul's Hardware */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-blue-400" />
                  Paul's Hardware
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/0bUghCx9iso"
                      title="How to Choose PC Parts"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Learn how to choose the right components for your budget and needs.
                  </p>
                </div>
              </div>
            </Card>

            {/* JayzTwoCents */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-purple-400" />
                  JayzTwoCents
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/0zOYdNEHDQo"
                      title="PC Building Tips & Tricks"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Essential tips and tricks for building your PC like a pro.
                  </p>
                </div>
              </div>
            </Card>

            {/* Bitwit */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-green-400" />
                  Bitwit
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/IhX0fOUYd8Q"
                      title="Ultimate PC Building Guide"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Comprehensive guide covering everything from parts selection to assembly.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tips & Best Practices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Tips & Best Practices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-white font-semibold">Budget Planning</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Set a realistic budget and allocate funds wisely. CPU and GPU typically take 60-70% of your budget.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-blue-400" />
                  <h3 className="text-white font-semibold">Future-Proofing</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Consider future upgrades. Choose a motherboard with good VRMs and a case with good airflow.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-white font-semibold">Research First</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Always research components before buying. Check reviews, benchmarks, and user feedback.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-purple-400" />
                  <h3 className="text-white font-semibold">Warranty & Support</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Consider warranty length and customer support quality when choosing brands.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-8 h-8 text-red-400" />
                  <h3 className="text-white font-semibold">Thermal Management</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Plan for adequate cooling. More powerful components need better thermal solutions.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <h3 className="text-white font-semibold">Test Everything</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Test your build outside the case first (breadboarding) to ensure all components work.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-500/30">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Build Your PC?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Now that you understand the basics, head over to our PC Builder and start creating your dream machine. 
                Our compatibility checker will guide you every step of the way.
              </p>
              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                onClick={() => {
                  const builderSection = document.getElementById('builder');
                  if (builderSection) {
                    builderSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Building Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Guide; 