import sqlite3
import json
from typing import List, Dict, Any, Optional
from django.conf import settings
import os
from django.contrib.auth.hashers import make_password, check_password
from datetime import datetime

class DatabaseManager:
    def __init__(self):
        self.db_path = os.path.join(settings.BASE_DIR, 'db.sqlite3')
    
    def get_connection(self):
        """Get a database connection"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row  # This allows accessing columns by name
        return conn
    
    def execute_query(self, query: str, params: tuple = ()) -> List[Dict[str, Any]]:
        """Execute a SELECT query and return results as list of dictionaries"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, params)
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def execute_update(self, query: str, params: tuple = ()) -> int:
        """Execute an INSERT, UPDATE, or DELETE query and return affected rows"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, params)
            conn.commit()
            return cursor.rowcount
    
    def execute_insert(self, query: str, params: tuple = ()) -> int:
        """Execute an INSERT query and return the last inserted ID"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, params)
            conn.commit()
            return cursor.lastrowid

# User operations
class UserDB:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_users(self) -> List[Dict[str, Any]]:
        query = """
        SELECT id, username, email, bio, avatar, is_pro_builder, 
               is_superuser, is_staff, is_active, date_joined
        FROM pcbuilder_user
        """
        return self.db.execute_query(query)
    
    def get_user_by_id(self, user_id: int) -> Optional[Dict[str, Any]]:
        query = """
        SELECT id, username, email, bio, avatar, is_pro_builder, 
               is_superuser, is_staff, is_active, date_joined
        FROM pcbuilder_user
        WHERE id = ?
        """
        results = self.db.execute_query(query, (user_id,))
        return results[0] if results else None
    
    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        query = """
        SELECT id, username, email, password, bio, avatar, is_pro_builder, 
               is_superuser, is_staff, is_active, date_joined
        FROM pcbuilder_user
        WHERE email = ?
        """
        results = self.db.execute_query(query, (email,))
        return results[0] if results else None
    
    def get_user_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        query = """
        SELECT id, username, email, password, bio, avatar, is_pro_builder, 
               is_superuser, is_staff, is_active, date_joined
        FROM pcbuilder_user
        WHERE username = ?
        """
        results = self.db.execute_query(query, (username,))
        return results[0] if results else None
    
    def create_user(self, username: str, email: str, password: str, 
                   bio: str = "", avatar: str = "", is_pro_builder: bool = False) -> int:
        hashed_password = make_password(password)
        current_time = datetime.now().isoformat()
        
        query = """
        INSERT INTO pcbuilder_user (
            username, email, password, bio, avatar, is_pro_builder,
            is_superuser, is_staff, is_active, date_joined, first_name, last_name
        ) VALUES (?, ?, ?, ?, ?, ?, FALSE, FALSE, TRUE, ?, '', '')
        """
        return self.db.execute_insert(query, (
            username, email, hashed_password, bio, avatar, is_pro_builder, current_time
        ))
    
    def check_password(self, user_id: int, password: str) -> bool:
        query = "SELECT password FROM pcbuilder_user WHERE id = ?"
        results = self.db.execute_query(query, (user_id,))
        if results:
            stored_password = results[0]['password']
            return check_password(password, stored_password)
        return False

# Category operations
class CategoryDB:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_categories(self) -> List[Dict[str, Any]]:
        query = "SELECT id, name, slug, icon FROM pcbuilder_category"
        return self.db.execute_query(query)
    
    def get_category_by_id(self, category_id: int) -> Optional[Dict[str, Any]]:
        query = "SELECT id, name, slug, icon FROM pcbuilder_category WHERE id = ?"
        results = self.db.execute_query(query, (category_id,))
        return results[0] if results else None

# Vendor operations
class VendorDB:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_vendors(self) -> List[Dict[str, Any]]:
        query = "SELECT id, name, website, logo FROM pcbuilder_vendor"
        return self.db.execute_query(query)
    
    def get_vendor_by_id(self, vendor_id: int) -> Optional[Dict[str, Any]]:
        query = "SELECT id, name, website, logo FROM pcbuilder_vendor WHERE id = ?"
        results = self.db.execute_query(query, (vendor_id,))
        return results[0] if results else None

# Component operations
class ComponentDB:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_components(self) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            c.id, c.name, c.description, c.price, c.image, 
            c.specs, c.stock, c.category_id, c.vendor_id,
            cat.name as category_name, cat.slug as category_slug,
            v.name as vendor_name, v.website as vendor_website
        FROM pcbuilder_component c
        JOIN pcbuilder_category cat ON c.category_id = cat.id
        JOIN pcbuilder_vendor v ON c.vendor_id = v.id
        """
        return self.db.execute_query(query)
    
    def get_component_by_id(self, component_id: int) -> Optional[Dict[str, Any]]:
        query = """
        SELECT 
            c.id, c.name, c.description, c.price, c.image, 
            c.specs, c.stock, c.category_id, c.vendor_id,
            cat.name as category_name, cat.slug as category_slug,
            v.name as vendor_name, v.website as vendor_website
        FROM pcbuilder_component c
        JOIN pcbuilder_category cat ON c.category_id = cat.id
        JOIN pcbuilder_vendor v ON c.vendor_id = v.id
        WHERE c.id = ?
        """
        results = self.db.execute_query(query, (component_id,))
        return results[0] if results else None
    
    def get_components_by_category(self, category_slug: str) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            c.id, c.name, c.description, c.price, c.image, 
            c.specs, c.stock, c.category_id, c.vendor_id,
            cat.name as category_name, cat.slug as category_slug,
            v.name as vendor_name, v.website as vendor_website
        FROM pcbuilder_component c
        JOIN pcbuilder_category cat ON c.category_id = cat.id
        JOIN pcbuilder_vendor v ON c.vendor_id = v.id
        WHERE cat.slug = ?
        """
        return self.db.execute_query(query, (category_slug,))
    
    def search_components(self, search_term: str) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            c.id, c.name, c.description, c.price, c.image, 
            c.specs, c.stock, c.category_id, c.vendor_id,
            cat.name as category_name, cat.slug as category_slug,
            v.name as vendor_name, v.website as vendor_website
        FROM pcbuilder_component c
        JOIN pcbuilder_category cat ON c.category_id = cat.id
        JOIN pcbuilder_vendor v ON c.vendor_id = v.id
        WHERE LOWER(c.name) LIKE LOWER('%' || ? || '%')
        """
        return self.db.execute_query(query, (search_term,))
    
    def get_components_by_price_range(self, min_price: float, max_price: float) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            c.id, c.name, c.description, c.price, c.image, 
            c.specs, c.stock, c.category_id, c.vendor_id,
            cat.name as category_name, cat.slug as category_slug,
            v.name as vendor_name, v.website as vendor_website
        FROM pcbuilder_component c
        JOIN pcbuilder_category cat ON c.category_id = cat.id
        JOIN pcbuilder_vendor v ON c.vendor_id = v.id
        WHERE c.price >= ? AND c.price <= ?
        """
        return self.db.execute_query(query, (min_price, max_price))

# Build operations
class BuildDB:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_user_builds(self, user_id: int) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            id, user_id, name, description, created, 
            updated, is_public, total_price
        FROM pcbuilder_build 
        WHERE user_id = ?
        ORDER BY created DESC
        """
        return self.db.execute_query(query, (user_id,))
    
    def get_build_by_id(self, build_id: int) -> Optional[Dict[str, Any]]:
        query = """
        SELECT 
            id, user_id, name, description, created, 
            updated, is_public, total_price
        FROM pcbuilder_build 
        WHERE id = ?
        """
        results = self.db.execute_query(query, (build_id,))
        return results[0] if results else None
    
    def create_build(self, user_id: int, name: str, description: str = "", is_public: bool = True) -> int:
        current_time = datetime.now().isoformat()
        query = """
        INSERT INTO pcbuilder_build (
            user_id, name, description, created, updated, 
            is_public, total_price
        ) VALUES (?, ?, ?, ?, ?, ?, 0.00)
        """
        params = (user_id, name, description, current_time, current_time, is_public)
        return self.db.execute_insert(query, params)
    
    def update_build(self, build_id: int, name: str = None, description: str = None, 
                    is_public: bool = None) -> bool:
        current_time = datetime.now().isoformat()
        
        # Build dynamic update query
        update_parts = ["updated = ?"]
        params = [current_time]
        
        if name is not None:
            update_parts.append("name = ?")
            params.append(name)
        if description is not None:
            update_parts.append("description = ?")
            params.append(description)
        if is_public is not None:
            update_parts.append("is_public = ?")
            params.append(is_public)
        
        params.append(build_id)
        query = f"UPDATE pcbuilder_build SET {', '.join(update_parts)} WHERE id = ?"
        
        return self.db.execute_update(query, tuple(params)) > 0
    
    def delete_build(self, build_id: int) -> bool:
        # First delete all build components
        self.db.execute_update("DELETE FROM pcbuilder_buildcomponent WHERE build_id = ?", (build_id,))
        # Then delete the build
        return self.db.execute_update("DELETE FROM pcbuilder_build WHERE id = ?", (build_id,)) > 0
    
    def update_build_total_price(self, build_id: int) -> bool:
        query = """
        UPDATE pcbuilder_build 
        SET total_price = (
            SELECT COALESCE(SUM(c.price * bc.quantity), 0.00)
            FROM pcbuilder_buildcomponent bc
            JOIN pcbuilder_component c ON bc.component_id = c.id
            WHERE bc.build_id = ?
        )
        WHERE id = ?
        """
        return self.db.execute_update(query, (build_id, build_id)) > 0

# Build Component operations
class BuildComponentDB:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_build_components(self, build_id: int) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            bc.id, bc.build_id, bc.component_id, bc.quantity, bc.notes,
            c.name as component_name, c.description as component_description, c.price as component_price, 
            c.image as component_image, c.specs as component_specs, c.stock as component_stock,
            cat.name as category_name, cat.slug as category_slug,
            v.name as vendor_name, v.website as vendor_website
        FROM pcbuilder_buildcomponent bc
        JOIN pcbuilder_component c ON bc.component_id = c.id
        JOIN pcbuilder_category cat ON c.category_id = cat.id
        JOIN pcbuilder_vendor v ON c.vendor_id = v.id
        WHERE bc.build_id = ?
        """
        return self.db.execute_query(query, (build_id,))
    
    def add_component_to_build(self, build_id: int, component_id: int, quantity: int = 1, notes: str = "") -> int:
        query = """
        INSERT INTO pcbuilder_buildcomponent (
            build_id, component_id, quantity, notes
        ) VALUES (?, ?, ?, ?)
        """
        return self.db.execute_insert(query, (build_id, component_id, quantity, notes))
    
    def remove_component_from_build(self, build_id: int, component_id: int) -> bool:
        query = "DELETE FROM pcbuilder_buildcomponent WHERE build_id = ? AND component_id = ?"
        return self.db.execute_update(query, (build_id, component_id)) > 0
    
    def update_component_quantity(self, build_id: int, component_id: int, quantity: int) -> bool:
        query = "UPDATE pcbuilder_buildcomponent SET quantity = ? WHERE build_id = ? AND component_id = ?"
        return self.db.execute_update(query, (quantity, build_id, component_id)) > 0

# Public builds operations
class PublicBuildDB:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_public_builds(self) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            b.id, b.user_id, b.name, b.description, b.created, 
            b.updated, b.is_public, b.total_price,
            u.username as user_username
        FROM pcbuilder_build b
        JOIN pcbuilder_user u ON b.user_id = u.id
        WHERE b.is_public = TRUE
        ORDER BY b.created DESC
        """
        return self.db.execute_query(query)
    
    def get_build_count_by_user(self, user_id: int) -> int:
        query = "SELECT COUNT(*) as build_count FROM pcbuilder_build WHERE user_id = ?"
        results = self.db.execute_query(query, (user_id,))
        return results[0]['build_count'] if results else 0
    
    def get_average_component_price_by_category(self, category_id: int) -> float:
        query = "SELECT AVG(price) as average_price FROM pcbuilder_component WHERE category_id = ?"
        results = self.db.execute_query(query, (category_id,))
        return results[0]['average_price'] if results and results[0]['average_price'] else 0.0
    
    def get_top_expensive_components(self, limit: int = 10) -> List[Dict[str, Any]]:
        query = """
        SELECT 
            c.id, c.name, c.description, c.price, c.image, 
            c.specs, c.stock, c.category_id, c.vendor_id,
            cat.name as category_name, cat.slug as category_slug,
            v.name as vendor_name, v.website as vendor_website
        FROM pcbuilder_component c
        JOIN pcbuilder_category cat ON c.category_id = cat.id
        JOIN pcbuilder_vendor v ON c.vendor_id = v.id
        ORDER BY c.price DESC
        LIMIT ?
        """
        return self.db.execute_query(query, (limit,)) 