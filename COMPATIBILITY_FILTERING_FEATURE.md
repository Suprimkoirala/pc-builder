# Compatibility Filtering Feature

## Overview

The PC Builder application now includes an intelligent compatibility filtering system that shows only compatible components during the selection process. This feature helps users avoid incompatible component combinations and ensures their builds will work together.

## Features

### 1. Smart Component Filtering
- **Default Behavior**: When enabled, only components compatible with your current build are shown
- **Toggle Option**: Users can switch between "Show Only Compatible" and "Show All Components"
- **Visual Indicators**: Incompatible components are visually marked with red borders and warning messages

### 2. Real-time Compatibility Checking
- **Client-side Processing**: Fast compatibility checks using client-side logic
- **No API Overhead**: Reduces server load by performing checks locally
- **Immediate Feedback**: Compatibility status updates instantly as you build

### 3. Comprehensive Compatibility Rules
The system checks for the following compatibility issues:

#### CPU & Motherboard
- **Socket Compatibility**: Ensures CPU socket matches motherboard socket
- **Examples**: LGA1700 CPU with LGA1700 motherboard = ✅ Compatible
- **Examples**: LGA1700 CPU with AM4 motherboard = ❌ Incompatible

#### GPU & Case
- **Size Compatibility**: Checks if GPU length fits within case maximum GPU length
- **Examples**: 285mm GPU in 360mm case = ✅ Compatible
- **Examples**: 380mm GPU in 360mm case = ❌ Incompatible

#### CPU Cooler & Case
- **Height Compatibility**: Verifies cooler height fits within case maximum cooler height
- **Examples**: 160mm cooler in 165mm case = ✅ Compatible
- **Examples**: 170mm cooler in 165mm case = ❌ Incompatible

#### Motherboard & Case
- **Form Factor Compatibility**: Ensures motherboard form factor is supported by case
- **Hierarchy**: ATX cases support ATX, mATX, ITX | mATX cases support mATX, ITX | ITX cases support only ITX

#### GPU & Power Supply
- **Power Requirements**: Checks if PSU wattage is sufficient for GPU TDP
- **Rule**: PSU should be at least 1.5x GPU TDP for adequate headroom
- **Examples**: 320W GPU requires minimum 480W PSU

## How to Use

### Enabling/Disabling the Feature
1. Open the PC Builder section
2. Look for the "Settings" card in the right panel
3. Toggle "Show only compatible components" ON/OFF
4. The setting persists during your session

### During Component Selection
1. Click on any component slot (CPU, GPU, etc.)
2. The component selector will show:
   - **Green checkmarks**: Compatible components
   - **Red borders**: Incompatible components (when "Show All" is selected)
   - **Warning messages**: Explanations for incompatibilities
3. Use the filter toggle to switch between compatible-only and all components

### Visual Indicators
- **Compatible Components**: Normal appearance with green checkmark
- **Incompatible Components**: 
  - Red border
  - Reduced opacity (60%)
  - Warning message: "May not be compatible with your current build"
  - Red checkmark icon

## Technical Implementation

### Files Modified
- `frontend/src/components/ComponentSelector.tsx` - Main component with filtering logic
- `frontend/src/components/PCBuilder.tsx` - Settings toggle and component passing
- `frontend/src/lib/compatibilityUtils.ts` - Client-side compatibility checker
- `frontend/src/services/api.ts` - API methods for compatibility checking

### Key Components

#### ClientCompatibilityChecker
```typescript
// Quick compatibility check without API calls
ClientCompatibilityChecker.checkComponentCompatibility(component, existingComponents)

// Filter components based on compatibility
ClientCompatibilityChecker.filterCompatibleComponents(components, existingComponents)
```

#### ComponentSelector Props
```typescript
interface ComponentSelectorProps {
  currentBuildComponents?: Component[]; // Current build components
  showOnlyCompatible?: boolean; // Toggle for filtering
  // ... other props
}
```

### Performance Optimizations
- **Client-side Processing**: No API calls for basic compatibility checks
- **Batch Processing**: Efficient handling of large component lists
- **Caching**: Compatibility results cached during component selection
- **Graceful Degradation**: Falls back to showing all components if checks fail

## Testing

### Manual Testing
1. Start with an empty build
2. Select a CPU (e.g., Intel LGA1700)
3. Try selecting a motherboard - only LGA1700 motherboards should be highlighted as compatible
4. Select an incompatible motherboard (e.g., AM4) - it should show with red border and warning
5. Toggle the compatibility filter to see all components

### Automated Testing
Run the compatibility tests in the browser console:
```javascript
// Open browser console and run:
runCompatibilityTests()
```

This will test various compatibility scenarios and report pass/fail results.

## Future Enhancements

### Planned Features
1. **Advanced Compatibility Rules**: More sophisticated compatibility checking
2. **Performance Optimization**: Further improvements to checking speed
3. **User Preferences**: Save compatibility filter preference
4. **Compatibility Explanations**: Detailed explanations for why components are incompatible
5. **Alternative Suggestions**: Show compatible alternatives for incompatible selections

### Potential Improvements
1. **Machine Learning**: Learn from user builds to improve compatibility rules
2. **Real-time Updates**: Update compatibility as components are added/removed
3. **Bulk Operations**: Check compatibility for entire component categories at once
4. **Export/Import**: Share compatibility rules between users

## Troubleshooting

### Common Issues
1. **No compatible components shown**: Check if your current build has components that severely limit options
2. **Slow performance**: Try disabling the compatibility filter temporarily
3. **Incorrect compatibility**: Report issues with specific component combinations

### Debug Mode
Enable debug logging by adding to browser console:
```javascript
localStorage.setItem('debugCompatibility', 'true')
```

This will show detailed compatibility checking information in the console.

## Conclusion

The compatibility filtering feature significantly improves the user experience by preventing incompatible component selections upfront. It reduces build errors and helps users create functional PC builds more efficiently. The feature is designed to be fast, accurate, and user-friendly while providing clear visual feedback about component compatibility. 