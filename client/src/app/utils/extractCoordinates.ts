export function extractCoordinates(input:string) {
    //Google Maps place URL with coordinates
    const placeUrlRegex = /https:\/\/www\.google\.com\/maps\/place\/[^@]+@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const placeMatch = input.match(placeUrlRegex);
  
    if (placeMatch) {
      const lat = parseFloat(placeMatch[1]);
      const lng = parseFloat(placeMatch[2]);
      return { lat, lng };
    }
  
    // Google Maps coordinates URL
    const coordsUrlRegex = /https:\/\/www\.google\.com\/maps\?q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const coordsMatch = input.match(coordsUrlRegex);
  
    if (coordsMatch) {
      const lat = parseFloat(coordsMatch[1]);
      const lng = parseFloat(coordsMatch[2]);
      return { lat, lng };
    }
  
    // Google Maps search query URL with coordinates
    const searchUrlRegex = /https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const searchMatch = input.match(searchUrlRegex);
  
    if (searchMatch) {
      const lat = parseFloat(searchMatch[1]);
      const lng = parseFloat(searchMatch[2]);
      return { lat, lng };
    }
  
    //Google Maps URL with coordinates and optional zoom level
    const mapsUrlRegex = /https:\/\/www\.google\.com\/maps\/@(-?\d+\.\d+),(-?\d+\.\d+)(?:,\d+\.?\d*)?z?\?entry=ttu/;
    const mapsMatch = input.match(mapsUrlRegex);
  
    if (mapsMatch) {
      const lat = parseFloat(mapsMatch[1]);
      const lng = parseFloat(mapsMatch[2]);
      return { lat, lng };
    }
  
    //Simple coordinates format
    const coordsRegex = /^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/;
    const coordMatch = input.match(coordsRegex);
  
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[2]);
      return { lat, lng };
    }
  
    // Fallback extraction using '3d' and '4d' parameters in URL
    const regex3d = /3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
    const match3d = input.match(regex3d);
  
    if (match3d) {
      const lat = parseFloat(match3d[1]);
      const lng = parseFloat(match3d[2]);
      return { lat, lng };
    }
  
    return null;
  }