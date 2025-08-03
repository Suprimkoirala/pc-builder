#!/usr/bin/env python
"""
Script to populate the database with PC components and compatibility rules
"""
import os
import sys
import django
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pcbuilder.database import (
    CategoryDB, VendorDB, ComponentDB, DatabaseManager
)

def create_categories():
    """Create component categories"""
    category_db = CategoryDB()
    
    categories = [
        {'name': 'CPU', 'slug': 'cpu', 'icon': 'fas fa-microchip'},
        {'name': 'Motherboard', 'slug': 'motherboard', 'icon': 'fas fa-server'},
        {'name': 'Graphics Card', 'slug': 'gpu', 'icon': 'fas fa-tv'},
        {'name': 'RAM', 'slug': 'ram', 'icon': 'fas fa-memory'},
        {'name': 'Storage', 'slug': 'storage', 'icon': 'fas fa-hdd'},
        {'name': 'Power Supply', 'slug': 'psu', 'icon': 'fas fa-plug'},
        {'name': 'Case', 'slug': 'case', 'icon': 'fas fa-box'},
        {'name': 'CPU Cooler', 'slug': 'cooler', 'icon': 'fas fa-fan'},
    ]
    
    for cat_data in categories:
        # Check if category exists
        existing = category_db.get_all_categories()
        if not any(cat['slug'] == cat_data['slug'] for cat in existing):
            print(f"Creating category: {cat_data['name']}")
            # We'll need to add create_category method to CategoryDB
            # For now, we'll use direct SQL
            db = DatabaseManager()
            db.execute_insert(
                "INSERT INTO pcbuilder_category (name, slug, icon) VALUES (?, ?, ?)",
                (cat_data['name'], cat_data['slug'], cat_data['icon'])
            )

def create_vendors():
    """Create vendor companies"""
    vendor_db = VendorDB()
    
    vendors = [
        {'name': 'Intel', 'website': 'https://www.intel.com', 'logo': 'https://logo.clearbit.com/intel.com'},
        {'name': 'AMD', 'website': 'https://www.amd.com', 'logo': 'https://logo.clearbit.com/amd.com'},
        {'name': 'ASUS', 'website': 'https://www.asus.com', 'logo': 'https://logo.clearbit.com/asus.com'},
        {'name': 'MSI', 'website': 'https://www.msi.com', 'logo': 'https://logo.clearbit.com/msi.com'},
        {'name': 'Gigabyte', 'website': 'https://www.gigabyte.com', 'logo': 'https://logo.clearbit.com/gigabyte.com'},
        {'name': 'NVIDIA', 'website': 'https://www.nvidia.com', 'logo': 'https://logo.clearbit.com/nvidia.com'},
        {'name': 'Corsair', 'website': 'https://www.corsair.com', 'logo': 'https://logo.clearbit.com/corsair.com'},
        {'name': 'EVGA', 'website': 'https://www.evga.com', 'logo': 'https://logo.clearbit.com/evga.com'},
        {'name': 'Seasonic', 'website': 'https://seasonic.com', 'logo': 'https://logo.clearbit.com/seasonic.com'},
        {'name': 'Noctua', 'website': 'https://noctua.at', 'logo': 'https://logo.clearbit.com/noctua.at'},
        {'name': 'NZXT', 'website': 'https://nzxt.com', 'logo': 'https://logo.clearbit.com/nzxt.com'},
        {'name': 'Fractal Design', 'website': 'https://www.fractal-design.com', 'logo': 'https://logo.clearbit.com/fractal-design.com'},
        {'name': 'G.Skill', 'website': 'https://www.gskill.com', 'logo': 'https://logo.clearbit.com/gskill.com'},
        {'name': 'Samsung', 'website': 'https://www.samsung.com', 'logo': 'https://logo.clearbit.com/samsung.com'},
        {'name': 'Western Digital', 'website': 'https://www.westerndigital.com', 'logo': 'https://logo.clearbit.com/westerndigital.com'},
        {'name': 'Seagate', 'website': 'https://www.seagate.com', 'logo': 'https://logo.clearbit.com/seagate.com'},
        {'name': 'Crucial', 'website': 'https://www.crucial.com', 'logo': 'https://logo.clearbit.com/crucial.com'},
        {'name': 'Cooler Master', 'website': 'https://www.coolermaster.com', 'logo': 'https://logo.clearbit.com/coolermaster.com'},
    ]
    
    for vendor_data in vendors:
        existing = vendor_db.get_all_vendors()
        if not any(v['name'] == vendor_data['name'] for v in existing):
            print(f"Creating vendor: {vendor_data['name']}")
            db = DatabaseManager()
            db.execute_insert(
                "INSERT INTO pcbuilder_vendor (name, website, logo) VALUES (?, ?, ?)",
                (vendor_data['name'], vendor_data['website'], vendor_data['logo'])
            )

def get_category_id(slug):
    """Get category ID by slug"""
    category_db = CategoryDB()
    categories = category_db.get_all_categories()
    for cat in categories:
        if cat['slug'] == slug:
            return cat['id']
    return None

def get_vendor_id(name):
    """Get vendor ID by name"""
    vendor_db = VendorDB()
    vendors = vendor_db.get_all_vendors()
    for vendor in vendors:
        if vendor['name'] == name:
            return vendor['id']
    return None

def create_components():
    """Create sample components"""
    component_db = ComponentDB()
    db = DatabaseManager()
    
    # CPUs
    cpus = [
        {
            'name': 'Intel Core i9-13900K',
            'description': '24-core (8P + 16E) processor with 32 threads, 3.0GHz base, up to 5.8GHz boost',
            'price': 599.99,
            'category_slug': 'cpu',
            'vendor_name': 'Intel',
            'image': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300',
            'specs': {
                'socket': 'LGA1700',
                'cores': 24,
                'threads': 32,
                'base_clock': '3.0GHz',
                'boost_clock': '5.8GHz',
                'tdp': 253,
                'integrated_graphics': True
            }
        },
        {
            'name': 'AMD Ryzen 9 7950X',
            'description': '16-core, 32-thread processor with 4.5GHz base, up to 5.7GHz boost',
            'price': 699.99,
            'category_slug': 'cpu',
            'vendor_name': 'AMD',
            'image': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300',
            'specs': {
                'socket': 'AM5',
                'cores': 16,
                'threads': 32,
                'base_clock': '4.5GHz',
                'boost_clock': '5.7GHz',
                'tdp': 170,
                'integrated_graphics': True
            }
        },
        {
            'name': 'Intel Core i5-13600K',
            'description': '14-core (6P + 8E) processor with 20 threads, 3.5GHz base, up to 5.1GHz boost',
            'price': 319.99,
            'category_slug': 'cpu',
            'vendor_name': 'Intel',
            'image': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300',
            'specs': {
                'socket': 'LGA1700',
                'cores': 14,
                'threads': 20,
                'base_clock': '3.5GHz',
                'boost_clock': '5.1GHz',
                'tdp': 181,
                'integrated_graphics': True
            }
        }
    ]
    
    # Motherboards
    motherboards = [
        {
            'name': 'ASUS ROG STRIX Z790-E GAMING',
            'description': 'ATX motherboard with DDR5, PCIe 5.0, WiFi 6E, and premium features',
            'price': 449.99,
            'category_slug': 'motherboard',
            'vendor_name': 'ASUS',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'socket': 'LGA1700',
                'form_factor': 'ATX',
                'memory_type': 'DDR5',
                'max_memory': 128,
                'pcie_slots': 4,
                'm2_slots': 4,
                'wifi': True
            }
        },
        {
            'name': 'MSI MPG X670E CARBON WIFI',
            'description': 'ATX motherboard with DDR5, PCIe 5.0, and premium AMD features',
            'price': 399.99,
            'category_slug': 'motherboard',
            'vendor_name': 'MSI',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'socket': 'AM5',
                'form_factor': 'ATX',
                'memory_type': 'DDR5',
                'max_memory': 128,
                'pcie_slots': 4,
                'm2_slots': 4,
                'wifi': True
            }
        },
        {
            'name': 'Gigabyte B760M AORUS ELITE',
            'description': 'Micro-ATX motherboard with DDR4, PCIe 4.0, and good value features',
            'price': 149.99,
            'category_slug': 'motherboard',
            'vendor_name': 'Gigabyte',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'socket': 'LGA1700',
                'form_factor': 'mATX',
                'memory_type': 'DDR4',
                'max_memory': 128,
                'pcie_slots': 3,
                'm2_slots': 2,
                'wifi': False
            }
        }
    ]
    
    # Graphics Cards
    gpus = [
        {
            'name': 'NVIDIA RTX 4090 Founders Edition',
            'description': '24GB GDDR6X, 450W TDP, Ray tracing and DLSS 3.0 support',
            'price': 1599.99,
            'category_slug': 'gpu',
            'vendor_name': 'NVIDIA',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'memory': 24,
                'memory_type': 'GDDR6X',
                'tdp': 450,
                'length': 304,
                'width': 137,
                'height': 61,
                'pcie_power': '16-pin'
            }
        },
        {
            'name': 'AMD RX 7900 XTX',
            'description': '24GB GDDR6, 355W TDP, AMD FSR 3.0 support',
            'price': 999.99,
            'category_slug': 'gpu',
            'vendor_name': 'AMD',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'memory': 24,
                'memory_type': 'GDDR6',
                'tdp': 355,
                'length': 287,
                'width': 135,
                'height': 50,
                'pcie_power': '8-pin + 8-pin'
            }
        },
        {
            'name': 'NVIDIA RTX 4070 Ti',
            'description': '12GB GDDR6X, 285W TDP, Great 1440p performance',
            'price': 799.99,
            'category_slug': 'gpu',
            'vendor_name': 'NVIDIA',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'memory': 12,
                'memory_type': 'GDDR6X',
                'tdp': 285,
                'length': 285,
                'width': 112,
                'height': 40,
                'pcie_power': '8-pin + 8-pin'
            }
        }
    ]
    
    # Power Supplies
    psus = [
        {
            'name': 'Corsair RM850x',
            'description': '850W 80+ Gold fully modular power supply',
            'price': 149.99,
            'category_slug': 'psu',
            'vendor_name': 'Corsair',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'wattage': 850,
                'efficiency': '80+ Gold',
                'modular': 'Fully Modular',
                'form_factor': 'ATX',
                'pcie_connectors': 4
            }
        },
        {
            'name': 'Seasonic PRIME TX-1000',
            'description': '1000W 80+ Titanium fully modular power supply',
            'price': 249.99,
            'category_slug': 'psu',
            'vendor_name': 'Seasonic',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'wattage': 1000,
                'efficiency': '80+ Titanium',
                'modular': 'Fully Modular',
                'form_factor': 'ATX',
                'pcie_connectors': 6
            }
        },
        {
            'name': 'EVGA 600 BR',
            'description': '600W 80+ Bronze non-modular power supply',
            'price': 49.99,
            'category_slug': 'psu',
            'vendor_name': 'EVGA',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'wattage': 600,
                'efficiency': '80+ Bronze',
                'modular': 'Non-Modular',
                'form_factor': 'ATX',
                'pcie_connectors': 2
            }
        }
    ]
    
    # Cases
    cases = [
        {
            'name': 'NZXT H510 Flow',
            'description': 'Mid-tower ATX case with mesh front panel and good airflow',
            'price': 89.99,
            'category_slug': 'case',
            'vendor_name': 'NZXT',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'form_factor': 'ATX',
                'max_gpu_length': 360,
                'max_cpu_cooler_height': 165,
                'max_psu_length': 180,
                'included_fans': 2,
                'max_fans': 4
            }
        },
        {
            'name': 'Fractal Design Meshify C',
            'description': 'Compact ATX case with excellent airflow and cable management',
            'price': 99.99,
            'category_slug': 'case',
            'vendor_name': 'Fractal Design',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'form_factor': 'ATX',
                'max_gpu_length': 315,
                'max_cpu_cooler_height': 172,
                'max_psu_length': 175,
                'included_fans': 2,
                'max_fans': 6
            }
        },
        {
            'name': 'Corsair 4000D Airflow',
            'description': 'Mid-tower ATX case with mesh front and excellent thermal performance',
            'price': 94.99,
            'category_slug': 'case',
            'vendor_name': 'Corsair',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'form_factor': 'ATX',
                'max_gpu_length': 360,
                'max_cpu_cooler_height': 170,
                'max_psu_length': 180,
                'included_fans': 2,
                'max_fans': 6
            }
        }
    ]
    
    # CPU Coolers
    coolers = [
        {
            'name': 'Noctua NH-D15',
            'description': 'Premium air cooler with dual 140mm fans and excellent performance',
            'price': 99.99,
            'category_slug': 'cooler',
            'vendor_name': 'Noctua',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'type': 'Air',
                'height': 165,
                'fan_size': 140,
                'fan_count': 2,
                'tdp_rating': 220,
                'noise_level': '24.6 dB(A)',
                'sockets': ['LGA1700', 'AM5', 'AM4', 'LGA1200']
            }
        },
        {
            'name': 'Corsair H150i ELITE CAPELLIX',
            'description': '360mm AIO liquid cooler with RGB fans and excellent cooling',
            'price': 189.99,
            'category_slug': 'cooler',
            'vendor_name': 'Corsair',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'type': 'Liquid',
                'radiator_size': 360,
                'fan_size': 120,
                'fan_count': 3,
                'tdp_rating': 300,
                'noise_level': '28 dB(A)',
                'sockets': ['LGA1700', 'AM5', 'AM4', 'LGA1200']
            }
        },
        {
            'name': 'Cooler Master Hyper 212 EVO V2',
            'description': 'Budget-friendly air cooler with good performance',
            'price': 39.99,
            'category_slug': 'cooler',
            'vendor_name': 'Cooler Master',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'type': 'Air',
                'height': 159,
                'fan_size': 120,
                'fan_count': 1,
                'tdp_rating': 150,
                'noise_level': '26 dB(A)',
                'sockets': ['LGA1700', 'AM5', 'AM4', 'LGA1200']
            }
        }
    ]
    
    # RAM
    ram_modules = [
        {
            'name': 'Corsair Vengeance LPX 32GB (2x16GB) DDR4-3200',
            'description': '32GB DDR4 memory kit with low profile design and XMP support',
            'price': 119.99,
            'category_slug': 'ram',
            'vendor_name': 'Corsair',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'capacity': 32,
                'modules': 2,
                'speed': 3200,
                'type': 'DDR4',
                'latency': 'CL16',
                'voltage': 1.35,
                'form_factor': 'DIMM'
            }
        },
        {
            'name': 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6000',
            'description': '32GB DDR5 memory kit with RGB lighting and high performance',
            'price': 199.99,
            'category_slug': 'ram',
            'vendor_name': 'G.Skill',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'capacity': 32,
                'modules': 2,
                'speed': 6000,
                'type': 'DDR5',
                'latency': 'CL36',
                'voltage': 1.35,
                'form_factor': 'DIMM'
            }
        },
        {
            'name': 'Crucial Ballistix 16GB (2x8GB) DDR4-3600',
            'description': '16GB DDR4 memory kit with excellent performance and reliability',
            'price': 79.99,
            'category_slug': 'ram',
            'vendor_name': 'Crucial',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'capacity': 16,
                'modules': 2,
                'speed': 3600,
                'type': 'DDR4',
                'latency': 'CL16',
                'voltage': 1.35,
                'form_factor': 'DIMM'
            }
        }
    ]
    
    # Storage
    storage_devices = [
        {
            'name': 'Samsung 970 EVO Plus 1TB NVMe SSD',
            'description': '1TB NVMe SSD with excellent read/write speeds and reliability',
            'price': 99.99,
            'category_slug': 'storage',
            'vendor_name': 'Samsung',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'capacity': 1000,
                'type': 'NVMe SSD',
                'interface': 'PCIe 3.0 x4',
                'read_speed': 3500,
                'write_speed': 3300,
                'form_factor': 'M.2 2280',
                'nand_type': 'V-NAND 3-bit MLC'
            }
        },
        {
            'name': 'Western Digital Black SN850X 2TB NVMe SSD',
            'description': '2TB PCIe 4.0 NVMe SSD with exceptional gaming performance',
            'price': 199.99,
            'category_slug': 'storage',
            'vendor_name': 'Western Digital',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'capacity': 2000,
                'type': 'NVMe SSD',
                'interface': 'PCIe 4.0 x4',
                'read_speed': 7300,
                'write_speed': 6600,
                'form_factor': 'M.2 2280',
                'nand_type': 'BiCS5 112-Layer TLC'
            }
        },
        {
            'name': 'Seagate Barracuda 2TB HDD',
            'description': '2TB 7200RPM hard drive for bulk storage and backup',
            'price': 49.99,
            'category_slug': 'storage',
            'vendor_name': 'Seagate',
            'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300',
            'specs': {
                'capacity': 2000,
                'type': 'HDD',
                'interface': 'SATA 6Gb/s',
                'rpm': 7200,
                'cache': 256,
                'form_factor': '3.5-inch',
                'platters': 2
            }
        }
    ]
    
    all_components = cpus + motherboards + gpus + psus + cases + coolers + ram_modules + storage_devices
    
    for comp in all_components:
        category_id = get_category_id(comp['category_slug'])
        vendor_id = get_vendor_id(comp['vendor_name'])
        
        if category_id and vendor_id:
            # Check if component already exists
            existing = component_db.get_all_components()
            if not any(c['name'] == comp['name'] for c in existing):
                print(f"Creating component: {comp['name']}")
                db.execute_insert(
                    """INSERT INTO pcbuilder_component 
                       (name, description, price, category_id, vendor_id, image, specs, stock) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
                    (comp['name'], comp['description'], comp['price'], 
                     category_id, vendor_id, comp['image'], 
                     json.dumps(comp['specs']), 100)
                )

def create_compatibility_rules():
    """Create compatibility rules between components"""
    db = DatabaseManager()
    
    # Get category IDs
    categories = CategoryDB().get_all_categories()
    category_map = {cat['slug']: cat['id'] for cat in categories}
    
    rules = [
        # CPU-Motherboard compatibility (socket matching)
        {
            'source_slug': 'cpu',
            'target_slug': 'motherboard',
            'condition': {
                'rule': 'socket_match',
                'description': 'CPU socket must match motherboard socket'
            }
        },
        # GPU-Case compatibility (length fitting)
        {
            'source_slug': 'gpu',
            'target_slug': 'case',
            'condition': {
                'rule': 'gpu_length_fit',
                'description': 'GPU length must be less than case max GPU length'
            }
        },
        # CPU Cooler-Case compatibility (height fitting)
        {
            'source_slug': 'cooler',
            'target_slug': 'case',
            'condition': {
                'rule': 'cooler_height_fit',
                'description': 'CPU cooler height must be less than case max cooler height'
            }
        },
        # PSU-Case compatibility (length fitting)
        {
            'source_slug': 'psu',
            'target_slug': 'case',
            'condition': {
                'rule': 'psu_length_fit',
                'description': 'PSU length must be less than case max PSU length'
            }
        },
        # PSU-GPU compatibility (power requirements)
        {
            'source_slug': 'gpu',
            'target_slug': 'psu',
            'condition': {
                'rule': 'power_requirement',
                'description': 'PSU wattage must be sufficient for GPU TDP'
            }
        },
        # Motherboard-Case compatibility (form factor)
        {
            'source_slug': 'motherboard',
            'target_slug': 'case',
            'condition': {
                'rule': 'form_factor_match',
                'description': 'Motherboard form factor must be supported by case'
            }
        }
    ]
    
    for rule in rules:
        source_id = category_map.get(rule['source_slug'])
        target_id = category_map.get(rule['target_slug'])
        
        if source_id and target_id:
            # Check if rule already exists
            existing = db.execute_query(
                "SELECT * FROM pcbuilder_compatibilityrule WHERE source_id = ? AND target_id = ?",
                (source_id, target_id)
            )
            
            if not existing:
                print(f"Creating compatibility rule: {rule['source_slug']} -> {rule['target_slug']}")
                db.execute_insert(
                    "INSERT INTO pcbuilder_compatibilityrule (source_id, target_id, condition) VALUES (?, ?, ?)",
                    (source_id, target_id, json.dumps(rule['condition']))
                )

def main():
    print("Populating database with PC components...")
    
    print("\n1. Creating categories...")
    create_categories()
    
    print("\n2. Creating vendors...")
    create_vendors()
    
    print("\n3. Creating components...")
    create_components()
    
    print("\n4. Creating compatibility rules...")
    create_compatibility_rules()
    
    print("\n✅ Database population completed successfully!")
    print("\nComponents added:")
    print("- CPUs: Intel i9-13900K, AMD Ryzen 9 7950X, Intel i5-13600K")
    print("- Motherboards: ASUS ROG STRIX Z790-E, MSI MPG X670E, Gigabyte B760M")
    print("- GPUs: RTX 4090, RX 7900 XTX, RTX 4070 Ti")
    print("- PSUs: Corsair RM850x, Seasonic PRIME TX-1000, EVGA 600 BR")
    print("- Cases: NZXT H510 Flow, Fractal Design Meshify C, Corsair 4000D")
    print("- Coolers: Noctua NH-D15, Corsair H150i, Cooler Master Hyper 212")

if __name__ == "__main__":
    main() 