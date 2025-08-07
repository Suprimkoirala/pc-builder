import { ClientCompatibilityChecker } from './compatibilityUtils';
import type { Component } from '../types';

// Test data for compatibility checking
const testCPU: Component = {
  id: 1,
  name: 'Intel Core i7-12700K',
  description: '12-core CPU',
  price: 399.99,
  image: 'cpu.jpg',
  specs: {
    socket: 'LGA1700',
    cores: 12,
    threads: 20
  },
  stock: 10,
  category_id: 1,
  vendor_id: 1,
  category_name: 'CPU',
  category_slug: 'cpu',
  vendor_name: 'Intel',
  vendor_website: 'https://intel.com'
};

const testMotherboard: Component = {
  id: 2,
  name: 'ASUS ROG STRIX Z690-E',
  description: 'ATX Motherboard',
  price: 299.99,
  image: 'motherboard.jpg',
  specs: {
    socket: 'LGA1700',
    form_factor: 'ATX'
  },
  stock: 5,
  category_id: 2,
  vendor_id: 2,
  category_name: 'Motherboard',
  category_slug: 'motherboard',
  vendor_name: 'ASUS',
  vendor_website: 'https://asus.com'
};

const incompatibleMotherboard: Component = {
  id: 3,
  name: 'ASUS ROG STRIX B550-E',
  description: 'ATX Motherboard',
  price: 199.99,
  image: 'motherboard.jpg',
  specs: {
    socket: 'AM4',
    form_factor: 'ATX'
  },
  stock: 5,
  category_id: 2,
  vendor_id: 2,
  category_name: 'Motherboard',
  category_slug: 'motherboard',
  vendor_name: 'ASUS',
  vendor_website: 'https://asus.com'
};

const testCase: Component = {
  id: 4,
  name: 'NZXT H510',
  description: 'ATX Case',
  price: 89.99,
  image: 'case.jpg',
  specs: {
    form_factor: 'ATX',
    max_gpu_length: 360,
    max_cpu_cooler_height: 165
  },
  stock: 15,
  category_id: 3,
  vendor_id: 3,
  category_name: 'Case',
  category_slug: 'case',
  vendor_name: 'NZXT',
  vendor_website: 'https://nzxt.com'
};

const testGPU: Component = {
  id: 5,
  name: 'NVIDIA RTX 3080',
  description: 'Graphics Card',
  price: 699.99,
  image: 'gpu.jpg',
  specs: {
    length: 285,
    tdp: 320
  },
  stock: 3,
  category_id: 4,
  vendor_id: 4,
  category_name: 'GPU',
  category_slug: 'gpu',
  vendor_name: 'NVIDIA',
  vendor_website: 'https://nvidia.com'
};

const largeGPU: Component = {
  id: 6,
  name: 'NVIDIA RTX 4090',
  description: 'Graphics Card',
  price: 1599.99,
  image: 'gpu.jpg',
  specs: {
    length: 380,
    tdp: 450
  },
  stock: 1,
  category_id: 4,
  vendor_id: 4,
  category_name: 'GPU',
  category_slug: 'gpu',
  vendor_name: 'NVIDIA',
  vendor_website: 'https://nvidia.com'
};

export function runCompatibilityTests() {
  console.log('Running compatibility tests...\n');

  // Test 1: CPU and compatible motherboard
  const test1 = ClientCompatibilityChecker.checkComponentCompatibility(testCPU, [testMotherboard]);
  console.log('Test 1 - CPU + Compatible Motherboard:', test1 ? 'PASS' : 'FAIL');

  // Test 2: CPU and incompatible motherboard
  const test2 = ClientCompatibilityChecker.checkComponentCompatibility(testCPU, [incompatibleMotherboard]);
  console.log('Test 2 - CPU + Incompatible Motherboard:', !test2 ? 'PASS' : 'FAIL');

  // Test 3: GPU and compatible case
  const test3 = ClientCompatibilityChecker.checkComponentCompatibility(testGPU, [testCase]);
  console.log('Test 3 - GPU + Compatible Case:', test3 ? 'PASS' : 'FAIL');

  // Test 4: Large GPU and compatible case
  const test4 = ClientCompatibilityChecker.checkComponentCompatibility(largeGPU, [testCase]);
  console.log('Test 4 - Large GPU + Compatible Case:', !test4 ? 'PASS' : 'FAIL');

  // Test 5: Motherboard and compatible case
  const test5 = ClientCompatibilityChecker.checkComponentCompatibility(testMotherboard, [testCase]);
  console.log('Test 5 - Motherboard + Compatible Case:', test5 ? 'PASS' : 'FAIL');

  // Test 6: Filter compatible components
  const allComponents = [testCPU, testMotherboard, incompatibleMotherboard, testCase, testGPU, largeGPU];
  const compatibleWithCPU = ClientCompatibilityChecker.filterCompatibleComponents(allComponents, [testCPU]);
  console.log('Test 6 - Filter compatible with CPU:', compatibleWithCPU.length === 5 ? 'PASS' : 'FAIL');

  console.log('\nCompatibility tests completed!');
}

// Run tests if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - expose for testing
  (window as any).runCompatibilityTests = runCompatibilityTests;
} 