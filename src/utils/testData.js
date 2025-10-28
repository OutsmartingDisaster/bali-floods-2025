// Simple test to verify GeoJSON data
export const testData = async () => {
  try {
    // Test flood points data
    const pointsResponse = await fetch('/data/flood_points.geojson')
    const pointsData = await pointsResponse.json()
    console.log('Flood points data loaded:', pointsData.features.length, 'features')
    
    // Test flood impact data
    const impactResponse = await fetch('/data/flood_impact.geojson')
    const impactData = await impactResponse.json()
    console.log('Flood impact data loaded:', impactData.features.length, 'features')
    
    // Test rivers data
    const riversResponse = await fetch('/data/rivers.geojson')
    const riversData = await riversResponse.json()
    console.log('Rivers data loaded:', riversData.features.length, 'features')
    
    // Test admin boundaries data
    const adminResponse = await fetch('/data/admin_boundaries.geojson')
    const adminData = await adminResponse.json()
    console.log('Admin boundaries data loaded:', adminData.features.length, 'features')
    
    return true
  } catch (error) {
    console.error('Error loading GeoJSON data:', error)
    return false
  }
}