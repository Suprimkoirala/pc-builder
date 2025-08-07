import React, { useState, useEffect } from 'react';
import { X, Search, Check, AlertCircle, Filter } from 'lucide-react';
import type { Component, Category } from '../types';
import { componentAPI, categoryAPI } from '../services/api';
import { ClientCompatibilityChecker } from '../lib/compatibilityUtils';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ComponentSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (component: Component) => void;
  categorySlug?: string;
  title?: string;
  currentBuildComponents?: Component[]; // New prop for current build
  showOnlyCompatible?: boolean; // New prop to control filtering
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  categorySlug,
  title = 'Select Component',
  currentBuildComponents = [],
  showOnlyCompatible = true // Default to showing only compatible components
}) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [compatibleComponents, setCompatibleComponents] = useState<Component[]>([]);
  const [compatibilityLoading, setCompatibilityLoading] = useState(false);
  const [showCompatibleOnly, setShowCompatibleOnly] = useState(showOnlyCompatible);

  // Update internal state when prop changes
  useEffect(() => {
    setShowCompatibleOnly(showOnlyCompatible);
  }, [showOnlyCompatible]);

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(categorySlug || '');
      loadCategories();
    }
  }, [isOpen, categorySlug]);

  useEffect(() => {
    if (isOpen) {
      loadComponents();
    }
  }, [isOpen, selectedCategory]);

  useEffect(() => {
    if (isOpen && currentBuildComponents.length > 0 && components.length > 0) {
      if (showCompatibleOnly) {
        checkCompatibility();
      } else {
        // Still check compatibility for visual indicators, but don't filter
        checkCompatibility();
      }
    } else if (currentBuildComponents.length === 0) {
      setCompatibleComponents([]);
    }
  }, [isOpen, currentBuildComponents, showCompatibleOnly, components]);

  const loadCategories = async () => {
    try {
      const categoriesData = await categoryAPI.getAll();
      setCategories(categoriesData);
    } catch (error) {
      // Handle error silently
    }
  };

  const loadComponents = async () => {
    setLoading(true);
    try {
      let componentsData: Component[];
      if (selectedCategory) {
        componentsData = await componentAPI.getByCategory(selectedCategory);
      } else {
        componentsData = await componentAPI.getAll();
      }
      setComponents(componentsData);
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const checkCompatibility = () => {
    if (currentBuildComponents.length === 0) {
      setCompatibleComponents([]);
      return;
    }

    setCompatibilityLoading(true);
    
    // Use client-side compatibility checker for better performance
    setTimeout(() => {
      try {
        const compatible = ClientCompatibilityChecker.filterCompatibleComponents(
          components,
          currentBuildComponents
        );
        setCompatibleComponents(compatible);
      } catch (error) {
        // If compatibility checking fails, show all components
        setCompatibleComponents(components);
      } finally {
        setCompatibilityLoading(false);
      }
    }, 100); // Small delay to show loading state
  };

  const filteredComponents = (() => {
    let componentsToFilter = components;
    
    // If showing only compatible and we have compatible components, use those
    if (showCompatibleOnly && compatibleComponents.length > 0) {
      componentsToFilter = compatibleComponents;
    }
    
    // Apply search filter
    return componentsToFilter.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })();



  const handleSelect = (component: Component) => {
    onSelect(component);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Compatibility Filter Toggle */}
        {currentBuildComponents.length > 0 && (
          <div className="mb-4">
            <Button
              onClick={() => setShowCompatibleOnly(!showCompatibleOnly)}
              variant={showCompatibleOnly ? 'default' : 'outline'}
              size="sm"
              className="flex items-center gap-2"
              disabled={compatibilityLoading}
            >
              <Filter className="w-4 h-4" />
              {showCompatibleOnly ? 'Show Only Compatible' : 'Show All Components'}
              {compatibilityLoading && <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>}
            </Button>
            {showCompatibleOnly && compatibleComponents.length > 0 && (
              <div className="text-sm text-emerald-400 mt-1">
                Showing {compatibleComponents.length} compatible components out of {components.length} total
              </div>
            )}
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCategory('')}
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                variant={selectedCategory === category.slug ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        </div>
        
        {/* Components List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-2">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-white">Loading components...</div>
            </div>
          ) : compatibilityLoading ? (
            <div className="text-center py-8">
              <div className="text-white">Checking compatibility...</div>
            </div>
          ) : filteredComponents.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-400">
                {showCompatibleOnly && currentBuildComponents.length > 0 
                  ? 'No compatible components found' 
                  : 'No components found'}
              </div>
              {showCompatibleOnly && currentBuildComponents.length > 0 && (
                <div className="text-sm text-gray-500 mt-2">
                  Try selecting "Show All Components" to see all available options
                </div>
              )}
            </div>
          ) : (
            filteredComponents.map((component) => {
              // Always check compatibility for visual indicators, regardless of filter setting
              const isCompatible = currentBuildComponents.length > 0 
                ? ClientCompatibilityChecker.checkComponentCompatibility(component, currentBuildComponents)
                : true;
              
              return (
                <Card
                  key={component.id}
                  className={`bg-gray-800 border-gray-700 hover:border-emerald-500 cursor-pointer transition-colors ${
                    !isCompatible ? 'opacity-60 border-red-500' : ''
                  }`}
                  onClick={() => handleSelect(component)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={component.image}
                            alt={component.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48/374151/FFFFFF?text=PC';
                            }}
                          />
                          <div>
                            <h3 className="text-white font-semibold">{component.name}</h3>
                            <p className="text-emerald-400 font-bold">${Number(component.price || 0).toFixed(2)}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{component.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>{component.category_name}</span>
                          <span>•</span>
                          <span>{component.vendor_name}</span>
                          <span>•</span>
                          <span>Stock: {component.stock}</span>
                        </div>
                        {!isCompatible && (
                          <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            May not be compatible with your current build
                          </div>
                        )}
                      </div>
                      <Check className={`w-5 h-5 ${isCompatible ? 'text-emerald-400' : 'text-red-400'}`} />
                    </div>
                  </div>
                </Card>
              );
            })
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSelector; 