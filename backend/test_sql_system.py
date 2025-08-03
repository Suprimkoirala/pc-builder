#!/usr/bin/env python
"""
Test script to verify SQL-based system works correctly
"""
import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from pcbuilder.database import UserDB, CategoryDB, VendorDB, ComponentDB, BuildDB, BuildComponentDB

def test_database_operations():
    print("Testing SQL-based database operations...")
    
    # Test User operations
    print("\n1. Testing User operations...")
    user_db = UserDB()
    
    # Create a test user
    user_id = user_db.create_user(
        username="testuser",
        email="test@example.com",
        password="testpass123",
        bio="Test user bio",
        is_pro_builder=False
    )
    print(f"Created user with ID: {user_id}")
    
    # Get user by ID
    user = user_db.get_user_by_id(user_id)
    print(f"Retrieved user: {user['username']} ({user['email']})")
    
    # Get user by email
    user_by_email = user_db.get_user_by_email("test@example.com")
    print(f"Retrieved user by email: {user_by_email['username']}")
    
    # Test password check
    password_valid = user_db.check_password(user_id, "testpass123")
    print(f"Password check result: {password_valid}")
    
    # Test Category operations
    print("\n2. Testing Category operations...")
    category_db = CategoryDB()
    categories = category_db.get_all_categories()
    print(f"Found {len(categories)} categories")
    for cat in categories[:3]:  # Show first 3
        print(f"  - {cat['name']} ({cat['slug']})")
    
    # Test Vendor operations
    print("\n3. Testing Vendor operations...")
    vendor_db = VendorDB()
    vendors = vendor_db.get_all_vendors()
    print(f"Found {len(vendors)} vendors")
    for vendor in vendors[:3]:  # Show first 3
        print(f"  - {vendor['name']} ({vendor['website']})")
    
    # Test Component operations
    print("\n4. Testing Component operations...")
    component_db = ComponentDB()
    components = component_db.get_all_components()
    print(f"Found {len(components)} components")
    for comp in components[:3]:  # Show first 3
        print(f"  - {comp['name']} (${comp['price']}) - {comp['category_name']}")
    
    # Test Build operations
    print("\n5. Testing Build operations...")
    build_db = BuildDB()
    
    # Create a test build
    build_id = build_db.create_build(
        user_id=user_id,
        name="Test Gaming PC",
        description="A test gaming PC build",
        is_public=True
    )
    print(f"Created build with ID: {build_id}")
    
    # Get user builds
    user_builds = build_db.get_user_builds(user_id)
    print(f"User has {len(user_builds)} builds")
    
    # Test Build Component operations
    print("\n6. Testing Build Component operations...")
    build_component_db = BuildComponentDB()
    
    if components:
        # Add first component to build
        component_id = components[0]['id']
        bc_id = build_component_db.add_component_to_build(
            build_id=build_id,
            component_id=component_id,
            quantity=1,
            notes="Test component"
        )
        print(f"Added component {component_id} to build {build_id}")
        
        # Get build components
        build_components = build_component_db.get_build_components(build_id)
        print(f"Build has {len(build_components)} components")
        
        # Update build total price
        build_db.update_build_total_price(build_id)
        updated_build = build_db.get_build_by_id(build_id)
        print(f"Updated build total price: ${updated_build['total_price']}")
    
    print("\n✅ All SQL operations completed successfully!")

if __name__ == "__main__":
    test_database_operations() 