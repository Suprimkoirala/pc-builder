export interface Component {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  vendor_id: number;
  image: string;
  specs: Record<string, any>;
  stock: number;
  category_name?: string;
  category_slug?: string;
  vendor_name?: string;
  vendor_website?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface Vendor {
  id: number;
  name: string;
  website: string;
  logo: string;
}

export interface Build {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created: string;
  updated: string;
  is_public: boolean;
  total_price: number;
  components: BuildComponent[];
}

export interface BuildComponent {
  id: number;
  build_id: number;
  component_id: number;
  quantity: number;
  notes: string;
  component_name?: string;
  component_description?: string;
  component_price?: number;
  component_image?: string;
  component_specs?: Record<string, any>;
  component_stock?: number;
  category_name?: string;
  category_slug?: string;
  vendor_name?: string;
  vendor_website?: string;
}

export interface CompatibilityResult {
  compatible: boolean;
  status: 'green' | 'red' | 'yellow';
  message: string;
  rule: string;
}

export interface BuildCompatibilityResult {
  overall_compatible: boolean;
  status: 'green' | 'red' | 'yellow';
  issues: Array<{
    component1: string;
    component2: string;
    message: string;
    rule: string;
  }>;
  warnings: Array<{
    component1: string;
    component2: string;
    message: string;
    rule: string;
  }>;
}

export interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  is_pro_builder: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  is_pro_builder?: boolean;
} 