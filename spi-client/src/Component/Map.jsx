import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OpenCageGeocode from 'opencage-api-client';

const ShopLocationMap = () => {
  const [shopLocation, setShopLocation] = useState(null);
  const { shopId } = useParams();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (shopId) {
          const response = await axios.get(`http://localhost:5000/api/shoplocation/shoplocation/${shopId}`);
          const locationData = response.data;

          console.log('Fetched location:', locationData);

          if ('location' in locationData && typeof locationData.location === 'string') {
            // Geocode the location to get coordinates
            const coordinates = await geocodeLocation(locationData.location);

            if (coordinates.latitude && coordinates.longitude) {
              setShopLocation({ place: locationData.location, ...coordinates });
            } else {
              console.error('Invalid coordinates:', coordinates);
            }
          } else if ('latitude' in locationData && 'longitude' in locationData) {
            setShopLocation(locationData);
          } else {
            console.error('Invalid location data:', locationData);
          }
        }
      } catch (error) {
        console.error('Error fetching shop location:', error);
      }
    };

    fetchLocation();
  }, [shopId]);

  const geocodeLocation = async (location) => {
    try {
      const response = await OpenCageGeocode.geocode({ q: location, key: 'e517c4d06d774a8d87af180b3588f097' });
      const { lat, lng } = response.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.error('Error geocoding location:', error);
      return {};
    }
  };

  if (!shopLocation) {
    return <div>Loading shop location...</div>;
  }

  const { latitude, longitude, place } = shopLocation;

  if (latitude !== undefined && longitude !== undefined) {
    return (
      <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '450px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{place || 'Shop Location'}</Popup>
        </Marker>
      </MapContainer>
    );
  } else {
    return (
      <div>
        <p>No valid location coordinates found.</p>
        <p>Place: {place}</p>
      </div>
    );
  }
};

export default ShopLocationMap;
