import React from 'react';
import { 
  Wrench, 
  BookOpen, 
  Play, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  User,
  Star,
  Shield,
  Zap,
  Cpu,
  Settings,
  ArrowDown
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const DIYResourcesPage: React.FC = () => {
  return (
    <section className="px-6 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            DIY Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access our comprehensive guides, tutorials, and resources to help you build your dream PC with confidence.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card 
            className="bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300 cursor-pointer transform"
            onClick={() => {
              document.getElementById('assembly-guide')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="p-6 text-center">
              <Wrench className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Assembly Guide</h3>
              <p className="text-gray-300 text-sm">Step-by-step PC assembly instructions</p>
              <ArrowDown className="w-5 h-5 text-emerald-400 mx-auto mt-3 opacity-60" />
            </div>
          </Card>
          
          <Card 
            className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:scale-105 transition-all duration-300 cursor-pointer transform"
            onClick={() => {
              document.getElementById('video-tutorials')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="p-6 text-center">
              <Play className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Video Tutorials</h3>
              <p className="text-gray-300 text-sm">Visual guides and demonstrations</p>
              <ArrowDown className="w-5 h-5 text-blue-400 mx-auto mt-3 opacity-60" />
            </div>
          </Card>
          
          <Card 
            className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 cursor-pointer transform"
            onClick={() => {
              document.getElementById('study-materials')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Study Materials</h3>
              <p className="text-gray-300 text-sm">PDFs, checklists, and reference guides</p>
              <ArrowDown className="w-5 h-5 text-purple-400 mx-auto mt-3 opacity-60" />
            </div>
          </Card>
          
          <Card 
            className="bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20 hover:scale-105 transition-all duration-300 cursor-pointer transform"
            onClick={() => {
              document.getElementById('troubleshooting')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="p-6 text-center">
              <Wrench className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Troubleshooting</h3>
              <p className="text-gray-300 text-sm">Common issues and solutions</p>
              <ArrowDown className="w-5 h-5 text-orange-400 mx-auto mt-3 opacity-60" />
            </div>
          </Card>
        </div>

        {/* PC Assembly Guide */}
        <div id="assembly-guide" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Complete PC Assembly Guide
          </h2>
          
          <div className="space-y-8">
            {/* Pre-Assembly Checklist */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  Pre-Assembly Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">All components purchased and verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">Clean, well-lit workspace</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">Anti-static wrist strap</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">Phillips head screwdriver</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">Thermal paste (if not included)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">Cable ties for management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">Flashlight for visibility</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-gray-300">Component manuals ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Assembly Steps */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center">Step-by-Step Assembly Process</h3>
              
              {/* Step 1: Prepare Case */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      1
                    </div>
                    <h4 className="text-xl font-semibold text-white">Prepare the Case</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Remove all panels and packaging materials from the case</p>
                    <p>• Install case fans in desired locations (typically 2-3 intake, 1 exhaust)</p>
                    <p>• Install the I/O shield that came with your motherboard</p>
                    <p>• Locate and prepare the motherboard standoffs</p>
                    <p>• Set up your workspace with good lighting and ventilation</p>
                  </div>
                </div>
              </Card>

              {/* Step 2: Install PSU */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      2
                    </div>
                    <h4 className="text-xl font-semibold text-white">Install Power Supply</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Position PSU in the case (usually at the bottom)</p>
                    <p>• Secure with provided screws (typically 4 screws)</p>
                    <p>• Route power cables through cable management holes</p>
                    <p>• Ensure PSU fan faces the correct direction (usually down or back)</p>
                    <p>• Don't connect cables yet - just position them</p>
                  </div>
                </div>
              </Card>

              {/* Step 3: Install CPU */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      3
                    </div>
                    <h4 className="text-xl font-semibold text-white">Install CPU on Motherboard</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Open CPU socket lever on motherboard</p>
                    <p>• Align CPU with socket (look for golden triangle or arrow)</p>
                    <p>• Gently place CPU in socket - DO NOT force it</p>
                    <p>• Close socket lever to secure CPU</p>
                    <p>• Apply thermal paste (pea-sized amount in center)</p>
                    <p>• Install CPU cooler according to manufacturer instructions</p>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 inline mr-2" />
                    <span className="text-yellow-300 text-sm font-medium">Important:</span>
                    <p className="text-gray-300 text-sm mt-1">Handle CPU carefully by the edges. Never touch the pins or contact surface.</p>
                  </div>
                </div>
              </Card>

              {/* Step 4: Install RAM */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      4
                    </div>
                    <h4 className="text-xl font-semibold text-white">Install RAM</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Open RAM slot clips on motherboard</p>
                    <p>• Align RAM stick with slot (notch should match)</p>
                    <p>• Press down firmly until clips snap into place</p>
                    <p>• For dual-channel, use slots 2 and 4 (or 1 and 3)</p>
                    <p>• Ensure both clips are fully engaged</p>
                  </div>
                </div>
              </Card>

              {/* Step 5: Install Motherboard */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      5
                    </div>
                    <h4 className="text-xl font-semibold text-white">Install Motherboard</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Place motherboard in case, aligning with I/O shield</p>
                    <p>• Ensure all standoffs are in correct positions</p>
                    <p>• Secure motherboard with screws (don't overtighten)</p>
                    <p>• Connect front panel connectors (power, reset, LEDs)</p>
                    <p>• Connect USB and audio headers</p>
                  </div>
                </div>
              </Card>

              {/* Step 6: Install Storage */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      6
                    </div>
                    <h4 className="text-xl font-semibold text-white">Install Storage Drives</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Install SSDs in dedicated slots or drive bays</p>
                    <p>• Install HDDs in 3.5" drive bays</p>
                    <p>• Connect SATA data cables to motherboard</p>
                    <p>• Connect SATA power cables from PSU</p>
                    <p>• For M.2 drives, install directly on motherboard</p>
                  </div>
                </div>
              </Card>

              {/* Step 7: Install GPU */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      7
                    </div>
                    <h4 className="text-xl font-semibold text-white">Install Graphics Card</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Remove PCIe slot covers from case</p>
                    <p>• Align GPU with PCIe x16 slot</p>
                    <p>• Press down firmly until it clicks into place</p>
                    <p>• Secure with screws to case</p>
                    <p>• Connect PCIe power cables from PSU</p>
                  </div>
                </div>
              </Card>

              {/* Step 8: Cable Management */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      8
                    </div>
                    <h4 className="text-xl font-semibold text-white">Cable Management</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Route all cables through cable management holes</p>
                    <p>• Use cable ties to secure and organize cables</p>
                    <p>• Ensure cables don't block airflow</p>
                    <p>• Keep cables away from moving parts (fans)</p>
                    <p>• Connect all remaining power cables</p>
                  </div>
                </div>
              </Card>

              {/* Step 9: Final Checks */}
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                      9
                    </div>
                    <h4 className="text-xl font-semibold text-white">Final Checks & Testing</h4>
                  </div>
                  <div className="space-y-3 text-gray-300">
                    <p>• Double-check all connections</p>
                    <p>• Ensure no loose screws or tools inside case</p>
                    <p>• Connect monitor, keyboard, and mouse</p>
                    <p>• Power on and enter BIOS</p>
                    <p>• Check that all components are detected</p>
                    <p>• Install operating system</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Video Tutorials */}
        <div id="video-tutorials" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Video Tutorials
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assembly Tutorials */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-red-400" />
                  Complete Assembly Walkthrough
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/v7MYOpFONCU"
                      title="Complete PC Assembly Guide"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      45 min
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Linus Tech Tips
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      4.9/5
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Comprehensive step-by-step guide covering the entire PC assembly process from start to finish.
                  </p>
                </div>
              </div>
            </Card>

            {/* Cable Management */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-blue-400" />
                  Cable Management Masterclass
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/0bUghCx9iso"
                      title="Cable Management Guide"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      20 min
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Paul's Hardware
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      4.8/5
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Learn professional cable management techniques for optimal airflow and aesthetics.
                  </p>
                </div>
              </div>
            </Card>

            {/* Troubleshooting */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-purple-400" />
                  Common Build Issues
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/0zOYdNEHDQo"
                      title="PC Building Troubleshooting"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      30 min
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      JayzTwoCents
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      4.7/5
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Troubleshoot common issues like no POST, overheating, and component detection problems.
                  </p>
                </div>
              </div>
            </Card>

            {/* BIOS Setup */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-green-400" />
                  BIOS Configuration
                </h3>
                
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/IhX0fOUYd8Q"
                      title="BIOS Setup Guide"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      25 min
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Bitwit
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      4.6/5
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Essential BIOS settings for optimal performance and system stability.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Study Materials */}
        <div id="study-materials" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Study Materials & Downloads
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Assembly Checklist */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-white font-semibold">Assembly Checklist</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Printable checklist covering all assembly steps and required tools.
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => window.open('/assembly-checklist.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </Card>

            {/* Component Compatibility Guide */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <h3 className="text-white font-semibold">Compatibility Guide</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Detailed guide on component compatibility rules and requirements.
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => window.open('/compatibility-guide.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </Card>

            {/* Troubleshooting Guide */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-8 h-8 text-orange-400" />
                  <h3 className="text-white font-semibold">Troubleshooting Guide</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Common issues, symptoms, and step-by-step solutions.
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => window.open('/troubleshooting-guide.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </Card>

            {/* BIOS Settings Reference */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-8 h-8 text-purple-400" />
                  <h3 className="text-white font-semibold">BIOS Settings</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Essential BIOS settings for different motherboard brands.
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => window.open('/bios-settings.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </Card>

            {/* Cable Management Guide */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-white font-semibold">Cable Management</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Professional cable management techniques and best practices.
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => window.open('/cable-management.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </Card>

            {/* Performance Optimization */}
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-8 h-8 text-red-400" />
                  <h3 className="text-white font-semibold">Performance Guide</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Tips for optimizing your PC's performance after assembly.
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => window.open('/performance-guide.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div id="troubleshooting" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Common Issues & Solutions
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Common Problems */}
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Common Build Problems</h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="text-white font-medium">PC Won't Turn On</h4>
                      <p className="text-gray-300 text-sm">Check power supply connections, front panel connectors, and power button wiring.</p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="text-white font-medium">No Display Output</h4>
                      <p className="text-gray-300 text-sm">Verify GPU installation, power connections, and monitor input selection.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-white font-medium">RAM Not Detected</h4>
                      <p className="text-gray-300 text-sm">Ensure RAM is properly seated and using correct slots for dual-channel.</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="text-white font-medium">Overheating Issues</h4>
                      <p className="text-gray-300 text-sm">Check CPU cooler installation, thermal paste application, and case airflow.</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="text-white font-medium">Boot Loop</h4>
                      <p className="text-gray-300 text-sm">Verify all connections, check for short circuits, and try minimal boot setup.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Diagnostic Steps */}
            <div className="space-y-4">
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Diagnostic Steps</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Minimal Boot Test</h4>
                        <p className="text-gray-300 text-sm">Test with only CPU, motherboard, RAM, and PSU connected.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Check BIOS</h4>
                        <p className="text-gray-300 text-sm">Enter BIOS and verify all components are detected.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Test Components</h4>
                        <p className="text-gray-300 text-sm">Test components individually if possible.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        4
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Update Drivers</h4>
                        <p className="text-gray-300 text-sm">Install latest motherboard and GPU drivers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-500/30">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Start Building?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Now that you have all the resources, head over to our PC Builder and start creating your dream machine. 
                Our compatibility checker will guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold"
                  onClick={() => {
                    document.getElementById('assembly-guide')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Review Assembly Guide
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DIYResourcesPage; 