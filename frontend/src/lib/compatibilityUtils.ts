import type { Component } from '../types';

export class ClientCompatibilityChecker {
  /**
   * Quick compatibility check for a component against existing build components
   * This performs basic checks without making API calls
   */
  static checkComponentCompatibility(
    component: Component,
    existingComponents: Component[]
  ): boolean {
    if (existingComponents.length === 0) return true;

    try {
      const componentSpecs = typeof component.specs === 'string' 
        ? JSON.parse(component.specs || '{}') 
        : component.specs || {};
      
      for (const existingComponent of existingComponents) {
        const existingSpecs = typeof existingComponent.specs === 'string'
          ? JSON.parse(existingComponent.specs || '{}')
          : existingComponent.specs || {};
        
        // Check for basic incompatibilities
        if (!this.checkBasicCompatibility(component, componentSpecs, existingComponent, existingSpecs)) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      // If parsing fails, assume compatible
      return true;
    }
  }

  private static checkBasicCompatibility(
    component: Component,
    componentSpecs: any,
    existingComponent: Component,
    existingSpecs: any
  ): boolean {
    const componentCategory = component.category_slug;
    const existingCategory = existingComponent.category_slug;

    // CPU and Motherboard socket compatibility
    if ((componentCategory === 'cpu' && existingCategory === 'motherboard') ||
        (componentCategory === 'motherboard' && existingCategory === 'cpu')) {
      return this.checkSocketCompatibility(component, componentSpecs, existingComponent, existingSpecs);
    }

    // GPU and Case size compatibility
    if ((componentCategory === 'gpu' && existingCategory === 'case') ||
        (componentCategory === 'case' && existingCategory === 'gpu')) {
      return this.checkGPUCaseCompatibility(component, componentSpecs, existingComponent, existingSpecs);
    }

    // CPU Cooler and Case height compatibility
    if ((componentCategory === 'cooler' && existingCategory === 'case') ||
        (componentCategory === 'case' && existingCategory === 'cooler')) {
      return this.checkCoolerCaseCompatibility(component, componentSpecs, existingComponent, existingSpecs);
    }

    // Motherboard and Case form factor compatibility
    if ((componentCategory === 'motherboard' && existingCategory === 'case') ||
        (componentCategory === 'case' && existingCategory === 'motherboard')) {
      return this.checkFormFactorCompatibility(component, componentSpecs, existingComponent, existingSpecs);
    }

    // GPU and PSU power compatibility
    if ((componentCategory === 'gpu' && existingCategory === 'psu') ||
        (componentCategory === 'psu' && existingCategory === 'gpu')) {
      return this.checkPowerCompatibility(component, componentSpecs, existingComponent, existingSpecs);
    }

    // Default to compatible if no specific rules apply
    return true;
  }

  private static checkSocketCompatibility(
    component: Component, 
    componentSpecs: any, 
    existingComponent: Component, 
    existingSpecs: any
  ): boolean {
    // Determine which is CPU and which is motherboard
    let cpuSpecs, mbSpecs;
    
    if (component.category_slug === 'cpu') {
      cpuSpecs = componentSpecs;
      mbSpecs = existingSpecs;
    } else if (existingComponent.category_slug === 'cpu') {
      cpuSpecs = existingSpecs;
      mbSpecs = componentSpecs;
    } else {
      return true; // Not a CPU-motherboard pair
    }
    
    const cpuSocket = cpuSpecs.socket;
    const mbSocket = mbSpecs.socket;
    
    if (!cpuSocket || !mbSocket) return true; // Assume compatible if specs are missing
    
    return cpuSocket === mbSocket;
  }

  private static checkGPUCaseCompatibility(
    component: Component, 
    componentSpecs: any, 
    existingComponent: Component, 
    existingSpecs: any
  ): boolean {
    // Determine which is GPU and which is case
    let gpuSpecs, caseSpecs;
    
    if (component.category_slug === 'gpu') {
      gpuSpecs = componentSpecs;
      caseSpecs = existingSpecs;
    } else if (existingComponent.category_slug === 'gpu') {
      gpuSpecs = existingSpecs;
      caseSpecs = componentSpecs;
    } else {
      return true; // Not a GPU-case pair
    }
    
    const gpuLength = gpuSpecs.length;
    const caseMaxGPU = caseSpecs.max_gpu_length;
    
    if (!gpuLength || !caseMaxGPU) return true; // Assume compatible if specs are missing
    
    return gpuLength <= caseMaxGPU;
  }

  private static checkCoolerCaseCompatibility(
    component: Component, 
    componentSpecs: any, 
    existingComponent: Component, 
    existingSpecs: any
  ): boolean {
    // Determine which is cooler and which is case
    let coolerSpecs, caseSpecs;
    
    if (component.category_slug === 'cooler') {
      coolerSpecs = componentSpecs;
      caseSpecs = existingSpecs;
    } else if (existingComponent.category_slug === 'cooler') {
      coolerSpecs = existingSpecs;
      caseSpecs = componentSpecs;
    } else {
      return true; // Not a cooler-case pair
    }
    
    const coolerHeight = coolerSpecs.height;
    const caseMaxCooler = caseSpecs.max_cpu_cooler_height;
    
    if (!coolerHeight || !caseMaxCooler) return true; // Assume compatible if specs are missing
    
    return coolerHeight <= caseMaxCooler;
  }

  private static checkFormFactorCompatibility(
    component: Component, 
    componentSpecs: any, 
    existingComponent: Component, 
    existingSpecs: any
  ): boolean {
    // Determine which is motherboard and which is case
    let mbSpecs, caseSpecs;
    
    if (component.category_slug === 'motherboard') {
      mbSpecs = componentSpecs;
      caseSpecs = existingSpecs;
    } else if (existingComponent.category_slug === 'motherboard') {
      mbSpecs = existingSpecs;
      caseSpecs = componentSpecs;
    } else {
      return true; // Not a motherboard-case pair
    }
    
    const mbFormFactor = mbSpecs.form_factor;
    const caseFormFactor = caseSpecs.form_factor;
    
    if (!mbFormFactor || !caseFormFactor) return true; // Assume compatible if specs are missing
    
    // Form factor hierarchy
    const formFactorHierarchy: { [key: string]: string[] } = {
      'ATX': ['ATX', 'mATX', 'ITX'],
      'mATX': ['mATX', 'ITX'],
      'ITX': ['ITX']
    };
    
    const supportedFormFactors = formFactorHierarchy[caseFormFactor] || [];
    return supportedFormFactors.includes(mbFormFactor);
  }

  private static checkPowerCompatibility(
    component: Component, 
    componentSpecs: any, 
    existingComponent: Component, 
    existingSpecs: any
  ): boolean {
    // Determine which is GPU and which is PSU
    let gpuSpecs, psuSpecs;
    
    if (component.category_slug === 'gpu') {
      gpuSpecs = componentSpecs;
      psuSpecs = existingSpecs;
    } else if (existingComponent.category_slug === 'gpu') {
      gpuSpecs = existingSpecs;
      psuSpecs = componentSpecs;
    } else {
      return true; // Not a GPU-PSU pair
    }
    
    const gpuTDP = gpuSpecs.tdp;
    const psuWattage = psuSpecs.wattage;
    
    if (!gpuTDP || !psuWattage) return true; // Assume compatible if specs are missing
    
    // Simple rule: PSU should be at least 1.5x GPU TDP for headroom
    const requiredWattage = gpuTDP * 1.5;
    return psuWattage >= requiredWattage;
  }

  /**
   * Filter components based on compatibility with existing build
   */
  static filterCompatibleComponents(
    components: Component[],
    existingComponents: Component[]
  ): Component[] {
    if (existingComponents.length === 0) return components;
    
    return components.filter(component => 
      this.checkComponentCompatibility(component, existingComponents)
    );
  }
} 