# SQL Equivalents for Django ORM Queries

This document shows the actual SQL queries that Django ORM generates for the operations in this PC Builder project.

## Database Schema (Based on Models)

```sql
-- Users table
CREATE TABLE pcbuilder_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    password VARCHAR(128) NOT NULL,
    last_login DATETIME NULL,
    is_superuser BOOLEAN NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    is_staff BOOLEAN NOT NULL,
    is_active BOOLEAN NOT NULL,
    date_joined DATETIME NOT NULL,
    bio TEXT,
    avatar VARCHAR(200),
    is_pro_builder BOOLEAN DEFAULT FALSE
);

-- Categories table
CREATE TABLE pcbuilder_category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(50)
);

-- Vendors table
CREATE TABLE pcbuilder_vendor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    website VARCHAR(200) NOT NULL,
    logo VARCHAR(200)
);

-- Components table
CREATE TABLE pcbuilder_component (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category_id INTEGER NOT NULL,
    vendor_id INTEGER NOT NULL,
    image VARCHAR(200) NOT NULL,
    specs TEXT NOT NULL, -- JSON field
    stock INTEGER DEFAULT 100,
    FOREIGN KEY (category_id) REFERENCES pcbuilder_category(id),
    FOREIGN KEY (vendor_id) REFERENCES pcbuilder_vendor(id)
);

-- Builds table
CREATE TABLE pcbuilder_build (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created DATETIME NOT NULL,
    updated DATETIME NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    total_price DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES pcbuilder_user(id)
);

-- Build Components (through table)
CREATE TABLE pcbuilder_buildcomponent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    build_id INTEGER NOT NULL,
    component_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1 CHECK (quantity >= 1),
    notes VARCHAR(200),
    FOREIGN KEY (build_id) REFERENCES pcbuilder_build(id),
    FOREIGN KEY (component_id) REFERENCES pcbuilder_component(id),
    UNIQUE(build_id, component_id)
);

-- Compatibility Rules table
CREATE TABLE pcbuilder_compatibilityrule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id INTEGER NOT NULL,
    target_id INTEGER NOT NULL,
    condition TEXT NOT NULL, -- JSON field
    FOREIGN KEY (source_id) REFERENCES pcbuilder_category(id),
    FOREIGN KEY (target_id) REFERENCES pcbuilder_category(id)
);
```

## ORM to SQL Conversions

### 1. UserViewSet - Get All Users
**ORM Query:**
```python
User.objects.all()
```

**Equivalent SQL:**
```sql
SELECT 
    id, password, last_login, is_superuser, username, 
    first_name, last_name, email, is_staff, is_active, 
    date_joined, bio, avatar, is_pro_builder
FROM pcbuilder_user;
```

### 2. CategoryViewSet - Get All Categories
**ORM Query:**
```python
Category.objects.all()
```

**Equivalent SQL:**
```sql
SELECT id, name, slug, icon 
FROM pcbuilder_category;
```

### 3. VendorViewSet - Get All Vendors
**ORM Query:**
```python
Vendor.objects.all()
```

**Equivalent SQL:**
```sql
SELECT id, name, website, logo 
FROM pcbuilder_vendor;
```

### 4. ComponentViewSet - Get All Components
**ORM Query:**
```python
Component.objects.all()
```

**Equivalent SQL:**
```sql
SELECT 
    c.id, c.name, c.description, c.price, c.image, 
    c.specs, c.stock, c.category_id, c.vendor_id,
    cat.name as category_name,
    v.name as vendor_name
FROM pcbuilder_component c
JOIN pcbuilder_category cat ON c.category_id = cat.id
JOIN pcbuilder_vendor v ON c.vendor_id = v.id;
```

### 5. BuildViewSet - Get User's Builds
**ORM Query:**
```python
Build.objects.filter(user=self.request.user)
```

**Equivalent SQL:**
```sql
SELECT 
    id, user_id, name, description, created, 
    updated, is_public, total_price
FROM pcbuilder_build 
WHERE user_id = ?;  -- ? is the current user's ID
```

### 6. LoginView - Get User by Email
**ORM Query:**
```python
User.objects.get(email=email)
```

**Equivalent SQL:**
```sql
SELECT 
    id, password, last_login, is_superuser, username, 
    first_name, last_name, email, is_staff, is_active, 
    date_joined, bio, avatar, is_pro_builder
FROM pcbuilder_user 
WHERE email = ?;  -- ? is the email parameter
```

### 7. Build Components with Details
**ORM Query:**
```python
BuildComponent.objects.filter(build=build).select_related('component', 'component__category', 'component__vendor')
```

**Equivalent SQL:**
```sql
SELECT 
    bc.id, bc.build_id, bc.component_id, bc.quantity, bc.notes,
    c.name as component_name, c.description, c.price, c.image, c.specs, c.stock,
    cat.name as category_name, cat.slug as category_slug,
    v.name as vendor_name, v.website as vendor_website
FROM pcbuilder_buildcomponent bc
JOIN pcbuilder_component c ON bc.component_id = c.id
JOIN pcbuilder_category cat ON c.category_id = cat.id
JOIN pcbuilder_vendor v ON c.vendor_id = v.id
WHERE bc.build_id = ?;  -- ? is the build ID
```

### 8. Components by Category
**ORM Query:**
```python
Component.objects.filter(category__slug='cpu')
```

**Equivalent SQL:**
```sql
SELECT 
    c.id, c.name, c.description, c.price, c.image, 
    c.specs, c.stock, c.category_id, c.vendor_id
FROM pcbuilder_component c
JOIN pcbuilder_category cat ON c.category_id = cat.id
WHERE cat.slug = 'cpu';
```

### 9. Build Total Price Calculation
**ORM Query:**
```python
sum(bc.component.price * bc.quantity for bc in build.components.all())
```

**Equivalent SQL:**
```sql
SELECT SUM(c.price * bc.quantity) as total_price
FROM pcbuilder_buildcomponent bc
JOIN pcbuilder_component c ON bc.component_id = c.id
WHERE bc.build_id = ?;  -- ? is the build ID
```

### 10. User Registration (INSERT)
**ORM Query:**
```python
user = User.objects.create_user(username=username, email=email, password=password)
```

**Equivalent SQL:**
```sql
INSERT INTO pcbuilder_user (
    username, email, password, is_superuser, 
    first_name, last_name, is_staff, is_active, date_joined
) VALUES (?, ?, ?, FALSE, '', '', FALSE, TRUE, ?);
-- ? values: username, email, hashed_password, current_datetime
```

### 11. Create New Build (INSERT)
**ORM Query:**
```python
Build.objects.create(user=user, name=name, description=description)
```

**Equivalent SQL:**
```sql
INSERT INTO pcbuilder_build (
    user_id, name, description, created, updated, 
    is_public, total_price
) VALUES (?, ?, ?, ?, ?, TRUE, 0.00);
-- ? values: user_id, name, description, current_datetime, current_datetime
```

### 12. Add Component to Build (INSERT)
**ORM Query:**
```python
BuildComponent.objects.create(build=build, component=component, quantity=quantity)
```

**Equivalent SQL:**
```sql
INSERT INTO pcbuilder_buildcomponent (
    build_id, component_id, quantity, notes
) VALUES (?, ?, ?, '');
-- ? values: build_id, component_id, quantity
```

### 13. Update Build Total Price
**ORM Query:**
```python
build.save()  # This triggers the custom save method
```

**Equivalent SQL:**
```sql
UPDATE pcbuilder_build 
SET total_price = (
    SELECT SUM(c.price * bc.quantity) 
    FROM pcbuilder_buildcomponent bc
    JOIN pcbuilder_component c ON bc.component_id = c.id
    WHERE bc.build_id = pcbuilder_build.id
)
WHERE id = ?;  -- ? is the build ID
```

### 14. Delete Build Component
**ORM Query:**
```python
BuildComponent.objects.filter(build=build, component=component).delete()
```

**Equivalent SQL:**
```sql
DELETE FROM pcbuilder_buildcomponent 
WHERE build_id = ? AND component_id = ?;
-- ? values: build_id, component_id
```

### 15. Search Components by Name
**ORM Query:**
```python
Component.objects.filter(name__icontains=search_term)
```

**Equivalent SQL:**
```sql
SELECT 
    c.id, c.name, c.description, c.price, c.image, 
    c.specs, c.stock, c.category_id, c.vendor_id
FROM pcbuilder_component c
WHERE LOWER(c.name) LIKE LOWER('%' || ? || '%');  -- ? is the search term
```

### 16. Get Components by Price Range
**ORM Query:**
```python
Component.objects.filter(price__gte=min_price, price__lte=max_price)
```

**Equivalent SQL:**
```sql
SELECT 
    c.id, c.name, c.description, c.price, c.image, 
    c.specs, c.stock, c.category_id, c.vendor_id
FROM pcbuilder_component c
WHERE c.price >= ? AND c.price <= ?;
-- ? values: min_price, max_price
```

### 17. Get Public Builds
**ORM Query:**
```python
Build.objects.filter(is_public=True)
```

**Equivalent SQL:**
```sql
SELECT 
    b.id, b.user_id, b.name, b.description, b.created, 
    b.updated, b.is_public, b.total_price,
    u.username as user_username
FROM pcbuilder_build b
JOIN pcbuilder_user u ON b.user_id = u.id
WHERE b.is_public = TRUE;
```

### 18. Get Build Count by User
**ORM Query:**
```python
Build.objects.filter(user=user).count()
```

**Equivalent SQL:**
```sql
SELECT COUNT(*) as build_count
FROM pcbuilder_build 
WHERE user_id = ?;  -- ? is the user ID
```

### 19. Get Average Component Price by Category
**ORM Query:**
```python
Component.objects.filter(category=category).aggregate(Avg('price'))
```

**Equivalent SQL:**
```sql
SELECT AVG(price) as average_price
FROM pcbuilder_component 
WHERE category_id = ?;  -- ? is the category ID
```

### 20. Get Top Expensive Components
**ORM Query:**
```python
Component.objects.order_by('-price')[:10]
```

**Equivalent SQL:**
```sql
SELECT 
    c.id, c.name, c.description, c.price, c.image, 
    c.specs, c.stock, c.category_id, c.vendor_id
FROM pcbuilder_component c
ORDER BY c.price DESC
LIMIT 10;
```

## Notes

1. **Parameterized Queries**: All SQL queries use parameterized queries (?) to prevent SQL injection.

2. **JSON Fields**: The `specs` and `condition` fields are stored as JSON text in SQLite. In PostgreSQL, you could use native JSON fields.

3. **Foreign Keys**: Django automatically handles foreign key relationships, but in raw SQL you need explicit JOINs.

4. **Transactions**: Django ORM automatically wraps operations in transactions. In raw SQL, you'd need to manage transactions manually.

5. **Validation**: Django ORM provides validation at the model level. In raw SQL, you'd need to implement validation in your application logic.

6. **Database Agnostic**: Django ORM is database-agnostic, while these SQL queries are specific to SQLite. For other databases, syntax might differ slightly. 