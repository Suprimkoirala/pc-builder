#!/usr/bin/env python
"""
Test script to demonstrate compatibility checking functionality
"""
import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pcbuilder.database import ComponentDB
from pcbuilder.compatibility_checker import CompatibilityChecker

def test_compatibility():
    print("🧪 Testing PC Component Compatibility System")
    print("=" * 50)
    
    component_db = ComponentDB()
    checker = CompatibilityChecker()
    
    # Get all components
    components = component_db.get_all_components()
    
    # Group components by category
    components_by_category = {}
    for comp in components:
        category = comp['category_slug']
        if category not in components_by_category:
            components_by_category[category] = []
        components_by_category[category].append(comp)
    
    print(f"\n📦 Available Components:")
    for category, comps in components_by_category.items():
        print(f"\n{category.upper()}:")
        for comp in comps:
            print(f"  - {comp['name']} (ID: {comp['id']})")
    
    # Test specific compatibility scenarios
    print(f"\n🔍 Testing Compatibility Scenarios:")
    print("=" * 50)
    
    # Scenario 1: Compatible CPU-Motherboard (Intel)
    print(f"\n1. ✅ Compatible CPU-Motherboard (Intel):")
    intel_cpu = next((c for c in components_by_category.get('cpu', []) 
                     if 'Intel' in c['name'] and 'i5' in c['name']), None)
    intel_mb = next((c for c in components_by_category.get('motherboard', []) 
                     if 'Gigabyte' in c['name']), None)
    
    if intel_cpu and intel_mb:
        result = checker.check_compatibility(intel_cpu['id'], intel_mb['id'])
        print(f"   CPU: {intel_cpu['name']}")
        print(f"   Motherboard: {intel_mb['name']}")
        print(f"   Status: {result['status'].upper()}")
        print(f"   Message: {result['message']}")
    
    # Scenario 2: Incompatible CPU-Motherboard (AMD CPU + Intel MB)
    print(f"\n2. ❌ Incompatible CPU-Motherboard (AMD CPU + Intel MB):")
    amd_cpu = next((c for c in components_by_category.get('cpu', []) 
                   if 'AMD' in c['name']), None)
    intel_mb = next((c for c in components_by_category.get('motherboard', []) 
                     if 'Gigabyte' in c['name']), None)
    
    if amd_cpu and intel_mb:
        result = checker.check_compatibility(amd_cpu['id'], intel_mb['id'])
        print(f"   CPU: {amd_cpu['name']}")
        print(f"   Motherboard: {intel_mb['name']}")
        print(f"   Status: {result['status'].upper()}")
        print(f"   Message: {result['message']}")
    
    # Scenario 3: Compatible GPU-Case
    print(f"\n3. ✅ Compatible GPU-Case:")
    gpu = next((c for c in components_by_category.get('gpu', []) 
               if 'RTX 4070' in c['name']), None)
    case = next((c for c in components_by_category.get('case', []) 
                if 'NZXT' in c['name']), None)
    
    if gpu and case:
        result = checker.check_compatibility(gpu['id'], case['id'])
        print(f"   GPU: {gpu['name']}")
        print(f"   Case: {case['name']}")
        print(f"   Status: {result['status'].upper()}")
        print(f"   Message: {result['message']}")
    
    # Scenario 4: Incompatible GPU-Case (GPU too long)
    print(f"\n4. ❌ Incompatible GPU-Case (GPU too long):")
    large_gpu = next((c for c in components_by_category.get('gpu', []) 
                     if 'RTX 4090' in c['name']), None)
    small_case = next((c for c in components_by_category.get('case', []) 
                      if 'Fractal' in c['name']), None)
    
    if large_gpu and small_case:
        result = checker.check_compatibility(large_gpu['id'], small_case['id'])
        print(f"   GPU: {large_gpu['name']}")
        print(f"   Case: {small_case['name']}")
        print(f"   Status: {result['status'].upper()}")
        print(f"   Message: {result['message']}")
    
    # Scenario 5: Compatible PSU-GPU
    print(f"\n5. ✅ Compatible PSU-GPU:")
    gpu = next((c for c in components_by_category.get('gpu', []) 
               if 'RTX 4070' in c['name']), None)
    psu = next((c for c in components_by_category.get('psu', []) 
               if 'Corsair' in c['name']), None)
    
    if gpu and psu:
        result = checker.check_compatibility(gpu['id'], psu['id'])
        print(f"   GPU: {gpu['name']}")
        print(f"   PSU: {psu['name']}")
        print(f"   Status: {result['status'].upper()}")
        print(f"   Message: {result['message']}")
    
    # Scenario 6: Incompatible PSU-GPU (insufficient power)
    print(f"\n6. ❌ Incompatible PSU-GPU (insufficient power):")
    power_hungry_gpu = next((c for c in components_by_category.get('gpu', []) 
                            if 'RTX 4090' in c['name']), None)
    weak_psu = next((c for c in components_by_category.get('psu', []) 
                    if 'EVGA' in c['name']), None)
    
    if power_hungry_gpu and weak_psu:
        result = checker.check_compatibility(power_hungry_gpu['id'], weak_psu['id'])
        print(f"   GPU: {power_hungry_gpu['name']}")
        print(f"   PSU: {weak_psu['name']}")
        print(f"   Status: {result['status'].upper()}")
        print(f"   Message: {result['message']}")
    
    # Scenario 7: Compatible Cooler-Case
    print(f"\n7. ✅ Compatible Cooler-Case:")
    cooler = next((c for c in components_by_category.get('cooler', []) 
                  if 'Noctua' in c['name']), None)
    case = next((c for c in components_by_category.get('case', []) 
                if 'NZXT' in c['name']), None)
    
    if cooler and case:
        result = checker.check_compatibility(cooler['id'], case['id'])
        print(f"   Cooler: {cooler['name']}")
        print(f"   Case: {case['name']}")
        print(f"   Status: {result['status'].upper()}")
        print(f"   Message: {result['message']}")
    
    # Test build compatibility
    print(f"\n🏗️ Testing Build Compatibility:")
    print("=" * 50)
    
    # Create a compatible build
    compatible_build = [
        next((c for c in components_by_category.get('cpu', []) 
              if 'Intel' in c['name'] and 'i5' in c['name']), None),
        next((c for c in components_by_category.get('motherboard', []) 
              if 'Gigabyte' in c['name']), None),
        next((c for c in components_by_category.get('gpu', []) 
              if 'RTX 4070' in c['name']), None),
        next((c for c in components_by_category.get('psu', []) 
              if 'Corsair' in c['name']), None),
        next((c for c in components_by_category.get('case', []) 
              if 'NZXT' in c['name']), None),
        next((c for c in components_by_category.get('cooler', []) 
              if 'Noctua' in c['name']), None),
    ]
    
    compatible_build = [c for c in compatible_build if c is not None]
    
    if len(compatible_build) >= 4:
        print(f"\n✅ Compatible Build Test:")
        print(f"   Components: {len(compatible_build)}")
        for comp in compatible_build:
            print(f"   - {comp['name']}")
        
        result = checker.check_build_compatibility(compatible_build)
        print(f"   Overall Status: {result['status'].upper()}")
        print(f"   Compatible: {result['overall_compatible']}")
        if result['issues']:
            print(f"   Issues: {len(result['issues'])}")
            for issue in result['issues']:
                print(f"     - {issue['component1']} + {issue['component2']}: {issue['message']}")
        if result['warnings']:
            print(f"   Warnings: {len(result['warnings'])}")
            for warning in result['warnings']:
                print(f"     - {warning['component1']} + {warning['component2']}: {warning['message']}")
    
    print(f"\n🎉 Compatibility testing completed!")
    print(f"\n💡 Usage:")
    print(f"   - POST /api/v1/compatibility/ with component1_id and component2_id")
    print(f"   - GET /api/v1/compatibility/?build_id=X to check entire build")
    print(f"   - Status: GREEN = Compatible, RED = Incompatible, YELLOW = Warning")

if __name__ == "__main__":
    test_compatibility() 