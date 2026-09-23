import { useEffect, useRef, useState } from "react";
import axios_client from "../axios/axios";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

// Set your Google Maps API Key here
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// Configure the loader options once globally
setOptions({
  key: GOOGLE_MAPS_API_KEY,
  v: "weekly",
});

function Register_Form() {
  const [image, setimage] = useState({ input: null });
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const image_change = (e) => {
    const value = e.target.files;
    setimage({ input: value });
  };

  useEffect(() => {
    if (mapRef.current) return; // Prevent map re-initialization on re-renders

    async function initMap() {
      try {
        // Load the maps library asynchronously using the new functional API
        const { Map } = await importLibrary("maps");

        // Default coordinates for Nairobi
        const nairobiCoordinates = { lat: -1.286389, lng: 36.817223 };

        const map = new Map(mapContainerRef.current, {
          center: nairobiCoordinates,
          zoom: 15,
        });

        mapRef.current = map;
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    }

    initMap();

    return () => {
      mapRef.current = null;
    };
  }, []);

  // Function to center map on user's current location via browser Geolocation API
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Keep raw accuracy value without integer conversion or halving
        const accuracy = position.coords.accuracy;

        if (mapRef.current) {
          mapRef.current.setCenter(pos);
          mapRef.current.setZoom(16);

          // Ensure the maps/marker libraries are ready
          await importLibrary("maps");

          // Add or move marker to current position
          if (markerRef.current) {
            markerRef.current.setPosition(pos);
          } else {
            markerRef.current = new window.google.maps.Marker({
              position: pos,
              map: mapRef.current,
              title: "Your Location",
            });
          }

          // Info window showing precise accuracy
          const infowindow = new window.google.maps.InfoWindow({
            content: `You are within ${accuracy} meters from this point`,
          });
          infowindow.setPosition(pos);
          infowindow.open(mapRef.current);
        }
      },
      (error) => {
        alert(error.message || "Location access denied or unavailable.");
      },
      { enableHighAccuracy: true }
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!image.input) return;

    const Frm = new FormData();
    for (let count = 0; count < image.input.length; count++) {
      Frm.append("images", image.input[count]);
    }

    // Capture current map center coordinates for submission
    const currentCenter = mapRef.current ? mapRef.current.getCenter() : null;
    const lat = currentCenter ? currentCenter.lat() : -1.286389;
    const long = currentCenter ? currentCenter.lng() : 36.817223;

    Frm.append(
      "body",
      JSON.stringify({
        house_location: { lat, long },
        house_name: "Test home",
        id: 100,
      })
    );

    try {
      const { data, status } = await axios_client.post("/api/register_house", Frm);
      if (status === 200) {
        console.log("Successfully uploaded image", data);
      } else {
        console.log(status, data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <form>
        <label>Enter your image</label>
        <input
          type="file"
          multiple
          placeholder="enter a file"
          onChange={image_change}
        />
        <button type="button" onClick={submit}>
          Submit
        </button>
      </form>

      {/* Button to trigger current location centering */}
      <div style={{ marginTop: "15px" }}>
        <button type="button" onClick={handleUseCurrentLocation}>
          Use Current Location
        </button>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "450px",
          marginTop: "15px",
        }}
      >
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </>
  );
}

export default Register_Form;