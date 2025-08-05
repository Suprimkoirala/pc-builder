import React, { useState, useEffect } from 'react';
import {
  Cpu,
  HardDrive,
  Monitor,
  Zap,
  Settings,
  ChevronDown,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  XCircle,
  DollarSign,
  Package
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import ComponentSelector from './ComponentSelector';
import CompatibilityStatus from './CompatibilityStatus';
import type { Component, BuildCompatibilityResult } from '../types';
import { buildAPI, compatibilityAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PCCase from '../assets/pcCase.png';

interface BuildSlot {
  category: string;
  categorySlug: string;
  icon: React.ReactNode;
  component: Component | null;
  placeholder: string;
}

const PCBuilder: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [buildSlots, setBuildSlots] = useState<BuildSlot[]>([
    {
      category: 'Case',
      categorySlug: 'case',
      icon: <Package className="w-5 h-5" />,
      component: null,
      placeholder: 'Select PC Case'
    },
    {
      category: 'Processor',
      categorySlug: 'cpu',
      icon: <Cpu className="w-5 h-5" />,
      component: null,
      placeholder: 'Select CPU'
    },
    {
      category: 'Processor Cooling',
      categorySlug: 'cooler',
      icon: <Settings className="w-5 h-5" />,
      component: null,
      placeholder: 'Select CPU Cooler'
    },
    {
      category: 'Memory',
      categorySlug: 'ram',
      icon: <HardDrive className="w-5 h-5" />,
      component: null,
      placeholder: 'Select RAM'
    },
    {
      category: 'Graphics Card',
      categorySlug: 'gpu',
      icon: <Monitor className="w-5 h-5" />,
      component: null,
      placeholder: 'Select GPU'
    },
    {
      category: 'Motherboard',
      categorySlug: 'motherboard',
      icon: <Settings className="w-5 h-5" />,
      component: null,
      placeholder: 'Select Motherboard'
    },
    {
      category: 'Power Supply',
      categorySlug: 'psu',
      icon: <Zap className="w-5 h-5" />,
      component: null,
      placeholder: 'Select PSU'
    }
  ]);

  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [buildCompatibility, setBuildCompatibility] = useState<BuildCompatibilityResult | null>(null);

  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever components change
  useEffect(() => {
    const total = buildSlots.reduce((sum, slot) => {
      return sum + Number(slot.component?.price || 0);
    }, 0);
    setTotalPrice(total);
  }, [buildSlots]);

  // Check compatibility whenever components change
  useEffect(() => {
    const selectedComponents = buildSlots.filter(slot => slot.component).map(slot => slot.component!);
    if (selectedComponents.length >= 2) {
      checkBuildCompatibility(selectedComponents);
    } else {
      setBuildCompatibility(null);
    }
  }, [buildSlots]);

  const checkBuildCompatibility = async (components: Component[]) => {
    try {
      // Create a temporary build to check compatibility
      const tempBuild = await buildAPI.create({
        name: 'Temp Build',
        description: 'Temporary build for compatibility check',
        is_public: false
      });

      // Add components to the build
      for (const component of components) {
        await buildAPI.addComponent(tempBuild.id, component.id);
      }

      // Check compatibility
      const compatibility = await compatibilityAPI.checkBuild(tempBuild.id);

      // Clean up temporary build
      await buildAPI.delete(tempBuild.id);

      setBuildCompatibility(compatibility);
    } catch (error) {
      // Handle compatibility check error silently
    }
  };

  const handleSlotClick = (index: number) => {
    setSelectedSlotIndex(index);
    setIsSelectorOpen(true);
  };

  const handleComponentSelect = (component: Component) => {
    if (selectedSlotIndex !== null) {
      const updatedSlots = [...buildSlots];
      updatedSlots[selectedSlotIndex].component = component;
      setBuildSlots(updatedSlots);
    }
  };

  const handleRemoveComponent = (index: number) => {
    const updatedSlots = [...buildSlots];
    updatedSlots[index].component = null;
    setBuildSlots(updatedSlots);
  };

  const handleSaveBuild = async () => {
    try {
      // Check if user is authenticated
      if (!isAuthenticated) {
        alert('Please log in to save your build.');
        return;
      }

      const selectedComponents = buildSlots.filter(slot => slot.component);
      if (selectedComponents.length === 0) {
        alert('Please select at least one component before saving.');
        return;
      }

      const buildName = prompt('Enter a name for your build:');
      if (!buildName) return;

      const build = await buildAPI.create({
        name: buildName,
        description: `PC Build with ${selectedComponents.length} components`,
        is_public: true
      });

      // Add components to the build
      for (const slot of selectedComponents) {
        if (slot.component) {
          await buildAPI.addComponent(build.id, slot.component.id);
        }
      }

      alert('Build saved successfully!');
    } catch (error) {
      alert('Failed to save build. Please try again.');
    }
  };

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case 'cpu':
        return <Cpu className="w-4 h-4" />;
      case 'gpu':
        return <Monitor className="w-4 h-4" />;
      case 'motherboard':
        return <Settings className="w-4 h-4" />;
      case 'ram':
        return <HardDrive className="w-4 h-4" />;
      case 'psu':
        return <Zap className="w-4 h-4" />;
      case 'case':
        return <Package className="w-4 h-4" />;
      case 'cooler':
        return <Settings className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <section id="builder" className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* PC Case Image and Compatibility Status */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={PCCase}
                alt="PC Case"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <Button 
                  className={`w-full font-bold ${
                    isAuthenticated 
                      ? 'bg-emerald-400 hover:bg-emerald-500 text-emerald-900' 
                      : 'bg-gray-500 hover:bg-gray-600 text-gray-200'
                  }`}
                  onClick={handleSaveBuild}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isAuthenticated ? 'SAVE BUILD' : 'LOGIN TO SAVE'}
                </Button>
              </div>
            </div>

            {/* Compatibility Status */}
            {buildCompatibility && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Compatibility Status</h3>
                <CompatibilityStatus result={buildCompatibility} showDetails={true} />
              </div>
            )}

            {/* Total Price */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-semibold">Total Price:</span>
                </div>
                <span className="text-emerald-400 font-bold text-xl">
                  ${Number(totalPrice || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Component Slots */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg mb-4">Build Components</h3>
            {buildSlots.map((slot, index) => (
              <Card
                key={index}
                className={`bg-emerald-200/20 border-emerald-300/30 hover:bg-emerald-200/30 transition-colors ${
                  slot.component ? 'border-green-500' : ''
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                      onClick={() => handleSlotClick(index)}
                    >
                      <div className="text-emerald-300">{slot.icon}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">
                          {slot.category}
                        </div>
                        {slot.component ? (
                          <div className="text-emerald-200 text-sm">
                            <div className="font-medium">{slot.component.name}</div>
                            <div className="text-emerald-400">${Number(slot.component.price || 0).toFixed(2)}</div>
                          </div>
                        ) : (
                          <div className="text-emerald-200 text-sm">
                            {slot.placeholder}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {slot.component && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveComponent(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                      <ChevronDown className="w-5 h-5 text-emerald-300" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recommendations and Stats */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Build Statistics</h3>
            
            {/* Component Count */}
            <Card className="bg-white/10 border-white/20">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-medium">Components Selected</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  {buildSlots.filter(slot => slot.component).length} / {buildSlots.length}
                </div>
              </div>
            </Card>

            {/* Selected Components */}
            <Card className="bg-white/10 border-white/20">
              <div className="p-4">
                <h4 className="text-white font-medium mb-3">Selected Components</h4>
                <div className="space-y-2">
                  {buildSlots
                    .filter(slot => slot.component)
                    .map((slot, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {getCategoryIcon(slot.categorySlug)}
                        <span className="text-gray-300">{slot.component?.name}</span>
                        <span className="text-emerald-400 ml-auto">${Number(slot.component?.price || 0).toFixed(2)}</span>
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* Compatibility Summary */}
            {buildCompatibility && (
              <Card className="bg-white/10 border-white/20">
                <div className="p-4">
                  <h4 className="text-white font-medium mb-3">Compatibility Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {buildCompatibility.status === 'green' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : buildCompatibility.status === 'red' ? (
                        <XCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className={`text-sm ${
                        buildCompatibility.status === 'green' ? 'text-green-400' :
                        buildCompatibility.status === 'red' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {buildCompatibility.overall_compatible ? 'Compatible' : 'Incompatible'}
                      </span>
                    </div>
                                         <div className="text-xs text-gray-400">
                       {buildCompatibility.issues?.length || 0} issues, {buildCompatibility.warnings?.length || 0} warnings
                     </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Component Selector Modal */}
      <ComponentSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={handleComponentSelect}
        categorySlug={selectedSlotIndex !== null ? buildSlots[selectedSlotIndex].categorySlug : undefined}
        title={selectedSlotIndex !== null ? `Select ${buildSlots[selectedSlotIndex].category}` : 'Select Component'}
      />
    </section>
  );
};

export default PCBuilder;
