import axios from '../axiosConfig';
import type {
  Component,
  Category,
  Vendor,
  Build,
  CompatibilityResult,
  BuildCompatibilityResult,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User
} from '../types';

// Component API
export const componentAPI = {
  getAll: async (): Promise<Component[]> => {
    const response = await axios.get('/api/v1/components/');
    return response.data;
  },

  getById: async (id: number): Promise<Component> => {
    const response = await axios.get(`/api/v1/components/${id}/`);
    return response.data;
  },

  getByCategory: async (categorySlug: string): Promise<Component[]> => {
    const response = await axios.get(`/api/v1/components/?category=${categorySlug}`);
    return response.data;
  }
};

// Category API
export const categoryAPI = {
  getAll: async (): Promise<Category[]> => {
    const response = await axios.get('/api/v1/categories/');
    return response.data;
  },

  getById: async (id: number): Promise<Category> => {
    const response = await axios.get(`/api/v1/categories/${id}/`);
    return response.data;
  }
};

// Vendor API
export const vendorAPI = {
  getAll: async (): Promise<Vendor[]> => {
    const response = await axios.get('/api/v1/vendors/');
    return response.data;
  },

  getById: async (id: number): Promise<Vendor> => {
    const response = await axios.get(`/api/v1/vendors/${id}/`);
    return response.data;
  }
};

// Build API
export const buildAPI = {
  getAll: async (): Promise<Build[]> => {
    const response = await axios.get('/api/v1/builds/');
    return response.data;
  },

  getById: async (id: number): Promise<Build> => {
    const response = await axios.get(`/api/v1/builds/${id}/`);
    return response.data;
  },

  create: async (data: { name: string; description?: string; is_public?: boolean }): Promise<Build> => {
    const response = await axios.post('/api/v1/builds/', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Build>): Promise<Build> => {
    const response = await axios.put(`/api/v1/builds/${id}/`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/api/v1/builds/${id}/`);
  },

  addComponent: async (buildId: number, componentId: number, quantity?: number, notes?: string): Promise<void> => {
    await axios.post(`/api/v1/builds/${buildId}/components/`, {
      component_id: componentId,
      quantity: quantity || 1,
      notes: notes || ''
    });
  },

  removeComponent: async (buildId: number, componentId: number): Promise<void> => {
    await axios.delete(`/api/v1/builds/${buildId}/components/${componentId}/`);
  }
};

// Public Builds API
export const publicBuildAPI = {
  getAll: async (): Promise<Build[]> => {
    const response = await axios.get('/api/v1/public-builds/');
    return response.data;
  },

  getById: async (id: number): Promise<Build> => {
    const response = await axios.get(`/api/v1/public-builds/${id}/`);
    return response.data;
  }
};

// Compatibility API
export const compatibilityAPI = {
  checkComponents: async (component1Id: number, component2Id: number): Promise<CompatibilityResult> => {
    const response = await axios.post('/api/v1/compatibility/', {
      component1_id: component1Id,
      component2_id: component2Id
    });
    return response.data;
  },

  checkBuild: async (buildId: number): Promise<BuildCompatibilityResult> => {
    const response = await axios.get(`/api/v1/compatibility/?build_id=${buildId}`);
    return response.data;
  },

  // Temporary build methods for compatibility checking
  createTempBuild: async (data: { name: string; description?: string; is_public?: boolean }): Promise<Build> => {
    const response = await axios.post('/api/v1/builds/', data);
    return response.data;
  },

  addComponentToBuild: async (buildId: number, componentId: number, quantity?: number, notes?: string): Promise<void> => {
    await axios.post(`/api/v1/builds/${buildId}/components/`, {
      component_id: componentId,
      quantity: quantity || 1,
      notes: notes || ''
    });
  },

  deleteTempBuild: async (buildId: number): Promise<void> => {
    await axios.delete(`/api/v1/builds/${buildId}/`);
  }
};

// Auth API
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post('/api/v1/login/', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axios.post('/api/v1/register/', data);
    return response.data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    await axios.post('/api/v1/logout/', { refresh: refreshToken });
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axios.get('/api/v1/me/');
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<{ access: string }> => {
    const response = await axios.post('/api/v1/token/refresh/', { refresh: refreshToken });
    return response.data;
  }
};

// User API
export const userAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get('/api/v1/users/');
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await axios.get(`/api/v1/users/${id}/`);
    return response.data;
  }
}; 