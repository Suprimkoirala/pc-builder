import React, { useState, useEffect } from 'react';
import { X, Search, Check, AlertCircle } from 'lucide-react';
import type { Component, Category } from '../types';
import { componentAPI, categoryAPI } from '../services/api';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ComponentSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (component: Component) => void;
  categorySlug?: string;
  title?: string;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  categorySlug,
  title = 'Select Component'
}) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

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

  const loadCategories = async () => {
    try {
      console.log('Loading categories...');
      const categoriesData = await categoryAPI.getAll();
      console.log('Categories loaded:', categoriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadComponents = async () => {
    setLoading(true);
    try {
      console.log('Loading components...');
      let componentsData: Component[];
      if (selectedCategory) {
        componentsData = await componentAPI.getByCategory(selectedCategory);
      } else {
        componentsData = await componentAPI.getAll();
      }
      console.log('Components loaded:', componentsData);
      setComponents(componentsData);
    } catch (error) {
      console.error('Failed to load components:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (component: Component) => {
    onSelect(component);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden">
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

        {/* Components List */}
        <div className="overflow-y-auto max-h-[60vh] space-y-2">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-white">Loading components...</div>
            </div>
          ) : filteredComponents.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-400">No components found</div>
            </div>
          ) : (
            filteredComponents.map((component) => (
              <Card
                key={component.id}
                className="bg-gray-800 border-gray-700 hover:border-emerald-500 cursor-pointer transition-colors"
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
                    </div>
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentSelector; 