import json
from typing import Dict, List, Tuple, Optional
from .database import ComponentDB, CategoryDB, DatabaseManager

class CompatibilityChecker:
    def __init__(self):
        self.component_db = ComponentDB()
        self.db = DatabaseManager()
    
    def check_compatibility(self, component1_id: int, component2_id: int) -> Dict[str, any]:
        """
        Check compatibility between two components
        Returns: {
            'compatible': bool,
            'status': 'green' | 'red' | 'yellow',
            'message': str,
            'rule': str
        }
        """
        # Get component details
        comp1 = self.component_db.get_component_by_id(component1_id)
        comp2 = self.component_db.get_component_by_id(component2_id)
        
        if not comp1 or not comp2:
            return {
                'compatible': False,
                'status': 'red',
                'message': 'One or both components not found',
                'rule': 'component_not_found'
            }
        
        # Get compatibility rules
        rules = self._get_compatibility_rules(comp1['category_slug'], comp2['category_slug'])
        
        if not rules:
            return {
                'compatible': True,
                'status': 'green',
                'message': 'No compatibility rules found - assumed compatible',
                'rule': 'no_rules'
            }
        
        # Check each rule
        for rule in rules:
            result = self._check_rule(comp1, comp2, rule)
            if not result['compatible']:
                return result
        
        return {
            'compatible': True,
            'status': 'green',
            'message': 'All compatibility checks passed',
            'rule': 'all_passed'
        }
    
    def check_build_compatibility(self, build_components: List[Dict]) -> Dict[str, any]:
        """
        Check compatibility for an entire build
        Returns: {
            'overall_compatible': bool,
            'status': 'green' | 'red' | 'yellow',
            'issues': List[Dict],
            'warnings': List[Dict]
        }
        """
        issues = []
        warnings = []
        
        # Check all component pairs
        for i, comp1 in enumerate(build_components):
            for j, comp2 in enumerate(build_components[i+1:], i+1):
                result = self.check_compatibility(comp1['id'], comp2['id'])
                if not result['compatible']:
                    issues.append({
                        'component1': comp1['name'],
                        'component2': comp2['name'],
                        'message': result['message'],
                        'rule': result['rule']
                    })
                elif result['status'] == 'yellow':
                    warnings.append({
                        'component1': comp1['name'],
                        'component2': comp2['name'],
                        'message': result['message'],
                        'rule': result['rule']
                    })
        
        # Determine overall status
        if issues:
            status = 'red'
            overall_compatible = False
        elif warnings:
            status = 'yellow'
            overall_compatible = True
        else:
            status = 'green'
            overall_compatible = True
        
        return {
            'overall_compatible': overall_compatible,
            'status': status,
            'issues': issues,
            'warnings': warnings
        }
    
    def _get_compatibility_rules(self, category1_slug: str, category2_slug: str) -> List[Dict]:
        """Get compatibility rules between two categories"""
        # Get category IDs
        category_db = CategoryDB()
        categories = category_db.get_all_categories()
        category_map = {cat['slug']: cat['id'] for cat in categories}
        
        cat1_id = category_map.get(category1_slug)
        cat2_id = category_map.get(category2_slug)
        
        if not cat1_id or not cat2_id:
            return []
        
        # Get rules in both directions
        rules = self.db.execute_query(
            """SELECT * FROM pcbuilder_compatibilityrule 
               WHERE (source_id = ? AND target_id = ?) 
               OR (source_id = ? AND target_id = ?)""",
            (cat1_id, cat2_id, cat2_id, cat1_id)
        )
        
        return [json.loads(rule['condition']) for rule in rules]
    
    def _check_rule(self, comp1: Dict, comp2: Dict, rule: Dict) -> Dict[str, any]:
        """Check a specific compatibility rule"""
        rule_type = rule.get('rule')
        
        if rule_type == 'socket_match':
            return self._check_socket_match(comp1, comp2)
        elif rule_type == 'gpu_length_fit':
            return self._check_gpu_length_fit(comp1, comp2)
        elif rule_type == 'cooler_height_fit':
            return self._check_cooler_height_fit(comp1, comp2)
        elif rule_type == 'psu_length_fit':
            return self._check_psu_length_fit(comp1, comp2)
        elif rule_type == 'power_requirement':
            return self._check_power_requirement(comp1, comp2)
        elif rule_type == 'form_factor_match':
            return self._check_form_factor_match(comp1, comp2)
        else:
            return {
                'compatible': True,
                'status': 'green',
                'message': f'Unknown rule type: {rule_type}',
                'rule': rule_type
            }
    
    def _check_socket_match(self, comp1: Dict, comp2: Dict) -> Dict[str, any]:
        """Check if CPU and motherboard sockets match"""
        # Determine which is CPU and which is motherboard
        cpu = None
        motherboard = None
        
        if comp1['category_slug'] == 'cpu':
            cpu = comp1
            motherboard = comp2
        elif comp2['category_slug'] == 'cpu':
            cpu = comp2
            motherboard = comp1
        else:
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a CPU-motherboard pair',
                'rule': 'socket_match'
            }
        
        if cpu['category_slug'] != 'cpu' or motherboard['category_slug'] != 'motherboard':
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a CPU-motherboard pair',
                'rule': 'socket_match'
            }
        
        cpu_specs = json.loads(cpu['specs'])
        mb_specs = json.loads(motherboard['specs'])
        
        cpu_socket = cpu_specs.get('socket')
        mb_socket = mb_specs.get('socket')
        
        if cpu_socket == mb_socket:
            return {
                'compatible': True,
                'status': 'green',
                'message': f'Socket match: {cpu_socket}',
                'rule': 'socket_match'
            }
        else:
            return {
                'compatible': False,
                'status': 'red',
                'message': f'Socket mismatch: CPU {cpu_socket} vs Motherboard {mb_socket}',
                'rule': 'socket_match'
            }
    
    def _check_gpu_length_fit(self, comp1: Dict, comp2: Dict) -> Dict[str, any]:
        """Check if GPU fits in case"""
        # Determine which is GPU and which is case
        gpu = None
        case = None
        
        if comp1['category_slug'] == 'gpu':
            gpu = comp1
            case = comp2
        elif comp2['category_slug'] == 'gpu':
            gpu = comp2
            case = comp1
        else:
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a GPU-case pair',
                'rule': 'gpu_length_fit'
            }
        
        if gpu['category_slug'] != 'gpu' or case['category_slug'] != 'case':
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a GPU-case pair',
                'rule': 'gpu_length_fit'
            }
        
        gpu_specs = json.loads(gpu['specs'])
        case_specs = json.loads(case['specs'])
        
        gpu_length = gpu_specs.get('length', 0)
        case_max_gpu = case_specs.get('max_gpu_length', 0)
        
        if gpu_length <= case_max_gpu:
            return {
                'compatible': True,
                'status': 'green',
                'message': f'GPU fits: {gpu_length}mm <= {case_max_gpu}mm',
                'rule': 'gpu_length_fit'
            }
        else:
            return {
                'compatible': False,
                'status': 'red',
                'message': f'GPU too long: {gpu_length}mm > {case_max_gpu}mm',
                'rule': 'gpu_length_fit'
            }
    
    def _check_cooler_height_fit(self, comp1: Dict, comp2: Dict) -> Dict[str, any]:
        """Check if CPU cooler fits in case"""
        # Determine which is cooler and which is case
        cooler = None
        case = None
        
        if comp1['category_slug'] == 'cooler':
            cooler = comp1
            case = comp2
        elif comp2['category_slug'] == 'cooler':
            cooler = comp2
            case = comp1
        else:
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a cooler-case pair',
                'rule': 'cooler_height_fit'
            }
        
        if cooler['category_slug'] != 'cooler' or case['category_slug'] != 'case':
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a cooler-case pair',
                'rule': 'cooler_height_fit'
            }
        
        cooler_specs = json.loads(cooler['specs'])
        case_specs = json.loads(case['specs'])
        
        cooler_height = cooler_specs.get('height', 0)
        case_max_cooler = case_specs.get('max_cpu_cooler_height', 0)
        
        if cooler_height <= case_max_cooler:
            return {
                'compatible': True,
                'status': 'green',
                'message': f'Cooler fits: {cooler_height}mm <= {case_max_cooler}mm',
                'rule': 'cooler_height_fit'
            }
        else:
            return {
                'compatible': False,
                'status': 'red',
                'message': f'Cooler too tall: {cooler_height}mm > {case_max_cooler}mm',
                'rule': 'cooler_height_fit'
            }
    
    def _check_psu_length_fit(self, comp1: Dict, comp2: Dict) -> Dict[str, any]:
        """Check if PSU fits in case"""
        # Determine which is PSU and which is case
        psu = None
        case = None
        
        if comp1['category_slug'] == 'psu':
            psu = comp1
            case = comp2
        elif comp2['category_slug'] == 'psu':
            psu = comp2
            case = comp1
        else:
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a PSU-case pair',
                'rule': 'psu_length_fit'
            }
        
        if psu['category_slug'] != 'psu' or case['category_slug'] != 'case':
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a PSU-case pair',
                'rule': 'psu_length_fit'
            }
        
        # Most PSUs are standard ATX size (140-180mm), so we'll assume compatibility
        # In a real system, you'd check actual PSU dimensions
        return {
            'compatible': True,
            'status': 'green',
            'message': 'PSU should fit in case (standard ATX sizing)',
            'rule': 'psu_length_fit'
        }
    
    def _check_power_requirement(self, comp1: Dict, comp2: Dict) -> Dict[str, any]:
        """Check if PSU has enough power for GPU"""
        # Determine which is GPU and which is PSU
        gpu = None
        psu = None
        
        if comp1['category_slug'] == 'gpu':
            gpu = comp1
            psu = comp2
        elif comp2['category_slug'] == 'gpu':
            gpu = comp2
            psu = comp1
        else:
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a GPU-PSU pair',
                'rule': 'power_requirement'
            }
        
        if gpu['category_slug'] != 'gpu' or psu['category_slug'] != 'psu':
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a GPU-PSU pair',
                'rule': 'power_requirement'
            }
        
        gpu_specs = json.loads(gpu['specs'])
        psu_specs = json.loads(psu['specs'])
        
        gpu_tdp = gpu_specs.get('tdp', 0)
        psu_wattage = psu_specs.get('wattage', 0)
        
        # Simple rule: PSU should be at least 1.5x GPU TDP for headroom
        required_wattage = gpu_tdp * 1.5
        
        if psu_wattage >= required_wattage:
            return {
                'compatible': True,
                'status': 'green',
                'message': f'PSU sufficient: {psu_wattage}W >= {required_wattage:.0f}W required',
                'rule': 'power_requirement'
            }
        else:
            return {
                'compatible': False,
                'status': 'red',
                'message': f'PSU insufficient: {psu_wattage}W < {required_wattage:.0f}W required',
                'rule': 'power_requirement'
            }
    
    def _check_form_factor_match(self, comp1: Dict, comp2: Dict) -> Dict[str, any]:
        """Check if motherboard form factor is supported by case"""
        # Determine which is motherboard and which is case
        motherboard = None
        case = None
        
        if comp1['category_slug'] == 'motherboard':
            motherboard = comp1
            case = comp2
        elif comp2['category_slug'] == 'motherboard':
            motherboard = comp2
            case = comp1
        else:
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a motherboard-case pair',
                'rule': 'form_factor_match'
            }
        
        if motherboard['category_slug'] != 'motherboard' or case['category_slug'] != 'case':
            return {
                'compatible': True,
                'status': 'green',
                'message': 'Not a motherboard-case pair',
                'rule': 'form_factor_match'
            }
        
        mb_specs = json.loads(motherboard['specs'])
        case_specs = json.loads(case['specs'])
        
        mb_form_factor = mb_specs.get('form_factor', 'ATX')
        case_form_factor = case_specs.get('form_factor', 'ATX')
        
        # ATX cases support ATX and smaller (mATX, ITX)
        # mATX cases support mATX and smaller (ITX)
        # ITX cases only support ITX
        form_factor_hierarchy = {
            'ATX': ['ATX', 'mATX', 'ITX'],
            'mATX': ['mATX', 'ITX'],
            'ITX': ['ITX']
        }
        
        supported_form_factors = form_factor_hierarchy.get(case_form_factor, [])
        
        if mb_form_factor in supported_form_factors:
            return {
                'compatible': True,
                'status': 'green',
                'message': f'Form factor compatible: {mb_form_factor} in {case_form_factor} case',
                'rule': 'form_factor_match'
            }
        else:
            return {
                'compatible': False,
                'status': 'red',
                'message': f'Form factor incompatible: {mb_form_factor} not supported in {case_form_factor} case',
                'rule': 'form_factor_match'
            } 