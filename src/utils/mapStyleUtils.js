/**
 * Map Style Utilities - Ensures Complete Style Isolation
 * 
 * These utilities help maintain strict separation between:
 * - InteractiveMap component (style-agnostic)
 * - Section components (style-controlling)
 */

/**
 * Creates a complete map state with required style configurations
 * Ensures no style leakage between sections
 */
export const createMapState = (config) => {
  const {
    center,
    zoom,
    pitch = 0,
    bearing = 0,
    mapStyle = "mapbox://styles/mapbox/satellite-streets-v12",
    interactive = true,
    layers = {},
    layerStyles = {},
    marker = null
  } = config;

  // Validate that enabled layers have corresponding styles
  const enabledLayers = Object.entries(layers)
    .filter(([_, enabled]) => enabled)
    .map(([layer, _]) => layer);

  const providedStyles = Object.keys(layerStyles);
  const missingStyles = enabledLayers.filter(layer => !providedStyles.includes(layer));

  if (missingStyles.length > 0) {
    console.warn(`Missing layer styles for: ${missingStyles.join(', ')}`);
  }

  return {
    center,
    zoom,
    pitch,
    bearing,
    mapStyle,
    interactive,
    layers,
    layerStyles,
    marker
  };
};

/**
 * Default layer style configurations
 * Use these as starting points for section customization
 */
export const defaultLayerStyles = {
  floodPoints: {
    color: '#dc2626',
    size: 6,
    opacity: 0.8
  },
  floodImpact: {
    color: '#f59e0b',
    opacity: 0.4
  },
  rivers: {
    color: '#3b82f6',
    width: 4,
    opacity: 0.8
  },
  buildings: {
    color: '#d1d5db',
    opacity: 0.7,
    outlineColor: '#9ca3af'
  },
  buildings3D: {
    color: '#9ca3af',
    opacity: 0.8
  },
  adminBoundaries: {
    color: '#374151',
    width: 1,
    opacity: 0.5
  }
};

/**
 * Creates layer styles by merging defaults with custom overrides
 */
export const createLayerStyles = (customStyles = {}) => {
  return {
    ...defaultLayerStyles,
    ...customStyles
  };
};

/**
 * Validates that a section's map states are properly configured
 */
export const validateSectionMapStates = (mapStates, sectionName) => {
  Object.entries(mapStates).forEach(([step, state]) => {
    if (!state.center || !state.zoom) {
      console.error(`${sectionName} step ${step}: Missing required center/zoom`);
    }
    
    if (!state.layerStyles && Object.values(state.layers || {}).some(Boolean)) {
      console.warn(`${sectionName} step ${step}: Should provide layerStyles for enabled layers`);
    }
  });
};
