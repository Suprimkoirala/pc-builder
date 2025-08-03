# 🖥️ PC Builder Frontend

A modern React TypeScript frontend for the PC Builder application with real-time compatibility checking and component management.

## ✨ Features

### 🔧 **Component Management**
- **Real Component Database**: Browse 18+ real PC components from major brands
- **Category Filtering**: Filter components by CPU, GPU, Motherboard, etc.
- **Search Functionality**: Find components by name or description
- **Component Details**: View specs, prices, and vendor information

### 🎯 **Compatibility System**
- **Real-time Compatibility Checking**: Automatic validation as you build
- **Color-coded Status**: 
  - 🟢 **Green** = Compatible
  - 🔴 **Red** = Incompatible (critical issues)
  - 🟡 **Yellow** = Warning (minor issues)
- **Detailed Feedback**: Specific compatibility messages and recommendations
- **Build-wide Validation**: Check entire builds for compatibility issues

### 🏗️ **PC Builder Interface**
- **Interactive Component Selection**: Click to select components for each category
- **Visual Build Slots**: Clear representation of each component type needed
- **Price Calculation**: Real-time total price updates
- **Build Statistics**: Component count and compatibility summary
- **Save Builds**: Save and share your configurations

### 👤 **User Authentication**
- **JWT Authentication**: Secure login/register system
- **User Profiles**: Personal build management
- **Session Management**: Automatic token refresh

### 🌐 **Community Features**
- **Public Builds**: Browse builds created by the community
- **Build Sharing**: Share your configurations publicly
- **Build Inspiration**: Get ideas from other users' builds

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## 📁 **Project Structure**

```
frontend/src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── PCBuilder.tsx   # Main PC builder interface
│   ├── ComponentSelector.tsx  # Component selection modal
│   ├── CompatibilityStatus.tsx # Compatibility display
│   ├── Header.tsx      # Navigation and auth
│   └── PastBuild.tsx   # Community builds display
├── context/            # React contexts
│   └── AuthContext.tsx # Authentication state management
├── services/           # API services
│   └── api.ts         # Backend API integration
├── types/              # TypeScript type definitions
│   └── index.ts       # Component and API types
├── assets/             # Static assets
└── lib/               # Utility functions
```

## 🔌 **API Integration**

### **Component API**
- `componentAPI.getAll()` - Get all components
- `componentAPI.getByCategory(slug)` - Get components by category
- `componentAPI.getById(id)` - Get specific component

### **Compatibility API**
- `compatibilityAPI.checkComponents(id1, id2)` - Check two components
- `compatibilityAPI.checkBuild(buildId)` - Check entire build

### **Build API**
- `buildAPI.create(data)` - Create new build
- `buildAPI.addComponent(buildId, componentId)` - Add component to build
- `buildAPI.getAll()` - Get user's builds

### **Authentication API**
- `authAPI.login(data)` - User login
- `authAPI.register(data)` - User registration
- `authAPI.getCurrentUser()` - Get current user info

## 🎨 **Compatibility Rules**

The system implements 6 core compatibility rules:

1. **Socket Matching** (CPU ↔ Motherboard)
   - CPU socket must match motherboard socket
   - Example: Intel LGA1700 CPU + LGA1700 motherboard = ✅

2. **GPU Length Fitting** (GPU ↔ Case)
   - GPU length must fit in case
   - Example: RTX 4070 Ti (285mm) + NZXT H510 Flow (360mm) = ✅

3. **CPU Cooler Height** (Cooler ↔ Case)
   - Cooler height must fit in case
   - Example: Noctua NH-D15 (165mm) + NZXT H510 Flow (165mm) = ✅

4. **Power Requirements** (GPU ↔ PSU)
   - PSU must provide sufficient power
   - Example: RTX 4070 Ti (285W) + Corsair RM850x (850W) = ✅

5. **Form Factor Matching** (Motherboard ↔ Case)
   - Motherboard form factor must be supported by case
   - Example: ATX motherboard + ATX case = ✅

6. **PSU Length Fitting** (PSU ↔ Case)
   - PSU must fit in case compartment
   - Standard ATX PSUs are generally compatible

## 🎯 **Usage Guide**

### **Building a PC**

1. **Start Building**
   - Navigate to the Builder section
   - Click on any component slot to open the selector

2. **Select Components**
   - Browse components by category
   - Use search to find specific components
   - Click to select a component

3. **Check Compatibility**
   - Compatibility is checked automatically
   - View detailed status in the compatibility panel
   - Fix any red (incompatible) issues

4. **Save Your Build**
   - Click "Save Build" when ready
   - Enter a name for your build
   - Your build will be saved and can be shared

### **Browsing Community Builds**

1. **View Public Builds**
   - Navigate to "Community Builds" section
   - Browse builds created by other users
   - See component lists and total prices

2. **Get Inspired**
   - Click "View Details" on any build
   - Use builds as starting points for your own

## 🛠️ **Development**

### **Adding New Components**
Components are managed through the backend API. To add new components:

1. Use the backend population script
2. Components will automatically appear in the frontend

### **Customizing Compatibility Rules**
Compatibility rules are defined in the backend. To modify:

1. Update the compatibility checker logic
2. Add new rules to the database
3. Frontend will automatically use new rules

### **Styling**
The app uses Tailwind CSS with a custom color scheme:
- Primary: Emerald green (`emerald-400`, `emerald-500`)
- Background: Dark gradient (`emerald-900` to `green-900`)
- Text: White and emerald variants

## 🔧 **Configuration**

### **API Endpoints**
The frontend connects to the backend at `http://localhost:8000`. To change:

1. Update `baseURL` in `src/axiosConfig.ts`
2. Update CORS settings in backend if needed

### **Environment Variables**
Create a `.env` file for environment-specific settings:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=PC Builder
```

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Components Not Loading**
   - Check if backend server is running
   - Verify API endpoints in browser dev tools
   - Check CORS settings

2. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify login credentials

3. **Compatibility Not Working**
   - Ensure components are properly loaded
   - Check browser console for API errors
   - Verify compatibility rules in backend

### **Debug Mode**
Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## 📝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 **Support**

For support and questions:
- Check the documentation
- Review the backend README
- Open an issue on GitHub

---

**Happy Building! 🖥️✨**
