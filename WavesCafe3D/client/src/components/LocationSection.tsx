import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface LocationCardProps {
  name: string;
  address: string;
  hours: string;
  phone: string;
  imageUrl: string;
  location: { lat: number; lng: number };
  delay?: string;
}

const LocationCard = ({ 
  name, 
  address, 
  hours, 
  phone, 
  imageUrl, 
  location,
  delay 
}: LocationCardProps) => {
  return (
    <div className="bg-white dark:bg-[#000042]/80 rounded-xl shadow-lg overflow-hidden transform transition hover:-translate-y-2" data-scroll-animation="fade-in" data-delay={delay}>
      <div className="relative h-64">
        <img src={imageUrl} alt={`${name} Location`} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-[#FFDE6A] text-[#000042] font-poppins font-semibold px-4 py-1 rounded-full">
          {name.split(" - ")[1]}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-poppins font-semibold text-xl text-[#000042] dark:text-white mb-3">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{address}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300 mb-6">
          <div className="flex items-center">
            <i className="fas fa-clock text-[#FFDE6A] mr-2"></i>
            <span>{hours}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-phone text-[#FFDE6A] mr-2"></i>
            <span>{phone}</span>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-[#000042]/60 rounded-lg h-48 relative overflow-hidden">
          {/* Google Map */}
          <MapComponent center={location} zoom={15} />
          <div className="absolute inset-0 hover:bg-[#000042]/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button 
              asChild
              className="bg-[#FFDE6A] text-[#000042] font-medium px-4 py-2 rounded-full"
            >
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
}

const MapComponent = ({ center, zoom }: MapComponentProps) => {
  // Check if we have a Google Maps API key
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // If no API key is available, show a placeholder
  if (!apiKey) {
    return (
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700/50 flex flex-col items-center justify-center p-2 text-center">
        <div className="text-[#000042] dark:text-white font-medium">Map Preview</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Lat: {center.lat.toFixed(4)}, Lng: {center.lng.toFixed(4)}
        </div>
      </div>
    );
  }
  
  // If we have an API key, load the map
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700/50 flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Loading Map...</span>
      </div>
    );
  }

  try {
    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#000042" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }]
            }
          ]
        }}
      >
        <MarkerF
          position={center}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      </GoogleMap>
    );
  } catch (error) {
    console.error("Error rendering map:", error);
    return (
      <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <span className="text-red-500 dark:text-red-400 text-sm">Map error</span>
      </div>
    );
  }
};

const LocationSection = () => {
  // Fetch locations from API
  const { data: locations = [], isLoading, error } = useQuery({
    queryKey: ['/api/locations'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/locations');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      return response.json();
    }
  });

  return (
    <section id="locations" className="py-20 bg-gray-100 dark:bg-[#00002e] theme-transition">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl text-[#000042] dark:text-white mb-4">
            Find Your <span className="text-[#FFDE6A]">Nearest</span> Café
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Visit us at one of our conveniently located cafés in Bangalore. Enjoy the same great taste and experience at either location.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-[#000042]/80 rounded-xl shadow-lg overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-48 w-full" />
                </div>
              </div>
            ))
          ) : error ? (
            // Show error message
            <div className="col-span-2 text-center text-red-500">
              <p>Failed to load cafe locations. Please try again later.</p>
            </div>
          ) : (
            // Show locations
            locations.map((location: any, index: number) => (
              <LocationCard
                key={index}
                name={location.name}
                address={location.address}
                hours={location.hours}
                phone={location.phone}
                imageUrl={location.imageUrl}
                location={location.location}
                delay={index > 0 ? "0.2" : undefined}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
