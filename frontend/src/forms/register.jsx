import { useEffect, useRef, useState } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { ImagePlus, LocateFixed, MapPin, Crosshair } from "lucide-react";
import axios_client from "../axios/axios";
import "./maps"
import {  importLibrary } from "@googlemaps/js-api-loader";


const styles = `
.hr-page {
  --hr-900: #0f3d24;
  --hr-700: #166534;
  --hr-600: #15803d;
  --hr-500: #16a34a;
  --hr-100: #dcfce7;
  --hr-50: #f0fdf4;
  --hr-ink: #10251a;
  --hr-muted: #5b6f63;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 16px 12px 48px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--hr-ink);
}
.hr-card {
  width: 100%;
  max-width: 780px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #d7ecdd;
  border-top: 4px solid var(--hr-600);
  border-radius: 16px;
  padding: 44px 44px 40px;
  box-shadow: 0 18px 40px -18px rgba(15, 61, 36, 0.35);
}
.hr-title {
  margin: 0 0 6px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.15;
  color: var(--hr-900);
}
.hr-sub { margin: 0 0 8px; font-size: 15px; line-height: 1.5; color: var(--hr-muted); }

.hr-section { margin-top: 34px; padding-top: 28px; border-top: 1px solid #e4f2e8; }
.hr-section:first-of-type { border-top: none; padding-top: 0; }
.hr-h2 {
  margin: 0 0 4px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--hr-900);
}
.hr-hint { margin: 0 0 20px; font-size: 14px; line-height: 1.5; color: var(--hr-muted); }

.hr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 18px; }
.hr-full { grid-column: 1 / -1; }
.hr-label { display: block; margin-bottom: 7px; font-size: 14px; font-weight: 600; color: var(--hr-900); }

.hr-input {
  width: 100%;
  background: #fbfefc;
  box-shadow: inset 0 0 0 1.5px #c6dfce;
  border-radius: 10px;
  transition: box-shadow 0.15s ease, background 0.15s ease;
}
.hr-input input { font-size: 16px; color: var(--hr-ink); }
.hr-input input::placeholder { color: #8ea496; }
.hr-input:hover { box-shadow: inset 0 0 0 1.5px #8fc4a0; }
.hr-input:focus-within {
  outline: none;
  background: #fff;
  box-shadow: inset 0 0 0 2px var(--hr-500), 0 0 0 4px rgba(22, 163, 74, 0.18);
}
.hr-input:has(input:disabled) { background: #f1f5f2; box-shadow: inset 0 0 0 1.5px #dbe6de; }

.hr-select {
  width: 100%;
  min-height: 44px;
  padding: 0 40px 0 12px;
  font: inherit;
  font-size: 16px;
  color: var(--hr-ink);
  background: #fbfefc url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23166534' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 14px center;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1.5px #c6dfce;
  appearance: none;
  cursor: pointer;
  transition: box-shadow 0.15s ease, background-color 0.15s ease;
}
.hr-select:hover { box-shadow: inset 0 0 0 1.5px #8fc4a0; }
.hr-select:focus {
  outline: none;
  background-color: #fff;
  box-shadow: inset 0 0 0 2px var(--hr-500), 0 0 0 4px rgba(22, 163, 74, 0.18);
}
.hr-select:invalid { color: #8ea496; }
.hr-select option { color: var(--hr-ink); }

.hr-drop {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 26px 16px;
  text-align: center;
  color: var(--hr-700);
  background: var(--hr-50);
  border: 2px dashed #8fc4a0;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
.hr-drop:hover { background: var(--hr-100); border-color: var(--hr-500); }
.hr-drop:focus-within {
  border-color: var(--hr-500);
  box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.18);
}
.hr-drop-title { font-size: 16px; font-weight: 600; color: var(--hr-900); }
.hr-drop-sub { font-size: 14px; color: var(--hr-muted); max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hr-file { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }

.hr-btn { width: 100%; height: 44px; font-size: 15px; font-weight: 600; cursor: pointer; }
.hr-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.hr-map {
  width: 100%;
  height: 380px;
  margin-top: 20px;
  overflow: hidden;
  background: var(--hr-100);
  border: 1px solid #d7ecdd;
  border-radius: 12px;
}
.hr-map > div { width: 100%; height: 100%; }
.hr-status {
  margin: 12px 0 0;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--hr-700);
  background: var(--hr-50);
  border: 1px solid #b7e4c4;
  border-radius: 8px;
}
.hr-submit { margin-top: 34px; }
.hr-submit button { width: 100%; height: 48px; font-size: 16px; font-weight: 600; cursor: pointer; }

@media (max-width: 600px) {
  .hr-card { padding: 28px 20px 26px; }
  .hr-grid, .hr-pair { grid-template-columns: 1fr; }
  .hr-map { height: 320px; }
}
`;

function Register_Form() {
  const [image, setimage] = useState({ input: null });
  const[state,setstate]=useState({manual:true,current:false})
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const[coord,setcoord]=useState({lat:"",long:""})
  const clickListen=useRef(null)
  const[manual,setmanual]=useState(false)
  const [data,setdata]=useState({house_location:"",house_name:"",house_rooms:"",house_available:"",
    house_coordinates:{lat:0,long:0},
    house_type:"",user_id:""})
  const cities={
    Kakamega: {
    center: { lat: 0.282731, lng: 34.751863 },
    zoom: 12,
    towns: {
      Milimani:{lat: 0.2833, lng: 34.7500 },
      Shieywe:{lat: 0.3000, lng: 34.7500 },
      Lurambi:{lat: 0.2833, lng: 34.7333 },
      Mumias:{ lat: 0.3333, lng: 34.4833 },
      Butere:{ lat: 0.2167, lng: 34.5000 },
    },
  },
  Mombasa: {
    center: { lat: -4.043477, lng: 39.668206 },
    zoom: 12,
    towns: {
      Nyali:              { lat: -4.0333, lng: 39.7000 },
      Bamburi:            { lat: -3.9833, lng: 39.7167 },
      Likoni:             { lat: -4.0833, lng: 39.6667 },
      Changamwe:          { lat: -4.0333, lng: 39.6167 },
      Kisauni:            { lat: -4.0333, lng: 39.6833 },
      Mtwapa:             { lat: -3.9500, lng: 39.7500 },
      Diani:              { lat: -4.2833, lng: 39.5833 },
      Tudor:              { lat: -4.0500, lng: 39.6667 },
      Mikindani:          { lat: -4.0667, lng: 39.6667 },
      Shanzu:             { lat: -3.9833, lng: 39.7333 },
      Miritini:           { lat: -4.0167, lng: 39.6000 },
      Magongo:            { lat: -4.0333, lng: 39.6333 },
    },
  },
}
  
  
  const datachange=(e)=>{
    const{name,value}=e.target
    setdata((data)=>({
      ...data,
      [name]:value
    }))
  }
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

   const exitManualMode = () => {
    setmanual(false);
    if (clickListen.current) {
      window.google?.maps?.event?.removeListener(clickListen.current);
      clickListen.current = null;
    }
    // Change cursor back to default
    if (mapRef.current) {
      mapRef.current.setOptions({ draggableCursor: null });
    }
  };
  const manual_handle=async()=>{
  if(!mapRef.current){
    alert ("Map not rendered yet");return;}
    if(manual){
      exitManualMode();
      return;
    }
    await importLibrary("maps");
    setmanual(true);
    mapRef.current.setOptions({ draggableCursor: "crosshair" });
    clickListen.current=mapRef.current.addListener('click',async(value)=>{
        const clickedLat = value.latLng.lat();
        const clickedLng = value.latLng.lng();

        const newPos = { lat: clickedLat, lng: clickedLng };

    if (markerRef.current) {
  markerRef.current.setPosition(newPos);
  markerRef.current.setTitle("Manually Selected Location");
  } else {
  markerRef.current = new window.google.maps.Marker({
    position: newPos,
    map: mapRef.current,
    title: "Manually Selected Location",
    draggable: true,
    animation: window.google.maps.Animation.DROP,
  });
}

    })
  
  }

const [arr,setarr]=useState(Object.keys(cities))
const [sub,setsub]=useState(Object.keys(cities.Kakamega.towns));
const [towns,tracktow]=useState({main:'',sub:''});
useEffect(()=>{
  setarr(Object.keys(cities))},[])

const town_change=(e)=>{
  console.log(towns.main,towns.sub)
  // Object.values(cities[towns.main].towns[towns.sub])
  const{name,value}=e.target;
  tracktow((data)=>({
    ...data,
    [name]:value
  }))
  if(name=="main"){
  if(value==''){
    tracktow((data)=>({...data,main:"",sub:""}))
    setsub([])
  }else{
  Object.values(cities[value]).length>0?
  setsub(Object.keys(cities[value].towns)):
  setsub([]),tracktow((data)=>({...data,sub:""}))
  console.log(towns.main,towns.sub)
  }
}

}
const use_location=async()=>{
  setstate({manual:true,current:false})
  if(!mapRef.current){
    console.log("map not initialized")
    return;
  }
  if(manual){
    exitManualMode();
    return;
  }
  await importLibrary("maps");
  setmanual(true);
  if(towns.main&&towns.main!=''){
    if(towns.sub){
      
      const coor={
        lat:Object.values(cities[towns.main].towns[towns.sub])[0],
        lng:Object.values(cities[towns.main].towns[towns.sub])[1]
      }
      console.log(coor)
      mapRef.current.setCenter(coor)
      mapRef.current.setZoom(16);
    }else{
      mapRef.current.setCenter(Object.values(cities[towns.main].center))
      mapRef.current.setZoom(Object.values(cities[towns.main].zoom));
    }
  }else{
    alert("Must choose a city")
    return
  }
  mapRef.current.setOptions({ draggableCursor: "crosshair" });
  clickListen.current=mapRef.current.addListener('click',async(coord)=>{
  const coordlat=coord.latLng.lat();
  const coordlong=coord.latLng.lng();
  const manual_val={
    lat:coordlat,
    lng:coordlong
  }
  mapRef.current.setCenter(manual_val);
  mapRef.current.setZoom(16);
  setdata((data)=>({...data,house_coordinates:{lat:manual_val.lat,long:manual_val.lng}}))
  if(markerRef.current){
    markerRef.current.setPosition(manual_val)
  }else{
    markerRef.current = new window.google.maps.Marker({
              position: manual_val,
              map: mapRef.current,
              title: "House location",
            });
  }
  })

}

  const se=()=>{
console.log(towns.main,towns.sub)
  }
  // Function to center map on user's current location via browser Geolocation API
  const handleUseCurrentLocation = async () => {
    setstate({manual:false,current:true})
    if(manual){
      exitManualMode();
    }
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
        data.house_coordinates.lat=position.coords.latitude
        data.house_coordinates.long=position.coords.longitude
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
    if(data.house_type==''){
      alert("Enter the house type");
      return
    }
    if(state.manual){
      Frm.append(
      "body",
      JSON.stringify({
        house_coordinates: data.house_coordinates,
        house_name: data.house_name,
        user_id: data.user_id,
        house_location:data.house_location,
        house_available:data.house_available,
        house_rooms:data.house_rooms,
        house_type:data.house_type
      })
    );
     try {
      console.log(Frm.get("body"));
      const { data, status } = await axios_client.post("/api/register_house", Frm);
      if (status === 200) {
        console.log("Successfully uploaded image", data);
      } else {
        console.log(status, data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
    }else{
    navigator.geolocation.getCurrentPosition(async(values)=>{
      setcoord({lat:values.coords.latitude,long:values.coords.longitude})
       Frm.append(
      "body",
      JSON.stringify({
        house_coordinates: {lat:values.coords.latitude,long:values.coords.longitude},
        house_name: data.house_name,
        user_id: data.user_id,
        house_location:data.house_location,
        house_available:data.house_available,
        house_rooms:data.house_rooms,
        house_type:data.house_type
      })
    );
  
     try {
      console.log(Frm.get("body"));
      const { data, status } = await axios_client.post("/api/register_house", Frm);
      if (status === 200) {
        console.log("Successfully uploaded image", data);
      } else {
        console.log(status, data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
    })
  }
    
    // Capture current map center coordinates for submission
    console.log(coord)
    // const currentCenter = mapRef.current ? mapRef.current.getCenter() : null;
    // const lat = currentCenter ? currentCenter.lat() : -1.286389;
    // const long = currentCenter ? currentCenter.lng() : 36.817223;
   

   
  };

  const imageCount = image.input ? image.input.length : 0;
  const imageNames = image.input ? Array.from(image.input).map((f) => f.name).join(", ") : "";

  return (
    <>
      <style>{styles}</style>
      <div className="hr-page">
        <form className="hr-card" onSubmit={submit}>
          <h1 className="hr-title">List your house</h1>
          <p className="hr-sub">
            Add clear photos and accurate details so the right tenants can find your place.
          </p>

          {/* ---------- House details ---------- */}
          <section className="hr-section">
            <h2 className="hr-h2">House details</h2>
            <p className="hr-hint">Tell house hunters what you are offering.</p>

            <div className="hr-grid">
              <div className="hr-full">
                <span className="hr-label">House images</span>
                <label className="hr-drop" htmlFor="images">
                  <ImagePlus size={28} />
                  <span className="hr-drop-title">
                    {imageCount
                      ? `${imageCount} image${imageCount > 1 ? "s" : ""} selected`
                      : "Choose house images"}
                  </span>
                  <span className="hr-drop-sub">
                    {imageCount ? imageNames : "You can select more than one photo"}
                  </span>
                  <input
                    id="images"
                    className="hr-file"
                    type="file"
                    multiple
                    accept="image/*"
                    required
                    onChange={image_change}
                  />
                </label>
              </div>

              <div className="hr-full">
                <label className="hr-label" htmlFor="house_name">House name</label>
                <TextField.Root
                  id="house_name"
                  className="hr-input"
                  size="3"
                  type="text"
                  name="house_name"
                  required
                  value={data.house_name}
                  onChange={datachange}
                  placeholder="e.g. Green Court Apartments"
                />
              </div>

              <div>
                <label className="hr-label" htmlFor="house_type">House type</label>
                <select
                  id="house_type"
                  className="hr-select"
                  name="house_type"
                  required
                  value={data.house_type}
                  onChange={datachange}
                >
                  <option value="">Choose house type</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="bedsitter">Bedsitter</option>
                  <option value="single">Single</option>
                </select>
              </div>

              <div>
                <label className="hr-label" htmlFor="house_rooms">Room type</label>
                {data.house_type == "single" ? (
                  <TextField.Root
                    id="house_rooms"
                    className="hr-input"
                    size="3"
                    disabled
                    placeholder="Not needed for single rooms"
                  />
                ) : (
                  <TextField.Root
                    id="house_rooms"
                    className="hr-input"
                    size="3"
                    type="text"
                    name="house_rooms"
                    value={data.house_rooms}
                    onChange={datachange}
                    placeholder="Enter room type"
                  />
                )}
              </div>

              <div>
                <label className="hr-label" htmlFor="house_available">Rooms available</label>
                <TextField.Root
                  id="house_available"
                  className="hr-input"
                  size="3"
                  type="number"
                  name="house_available"
                  required
                  value={data.house_available}
                  onChange={datachange}
                  placeholder="How many are vacant?"
                />
              </div>

              <div>
                <label className="hr-label" htmlFor="user_id">User ID</label>
                <TextField.Root
                  id="user_id"
                  className="hr-input"
                  size="3"
                  type="number"
                  name="user_id"
                  required
                  value={data.user_id}
                  onChange={datachange}
                  placeholder="Enter your ID number"
                />
              </div>

              <div className="hr-full">
                <label className="hr-label" htmlFor="house_location">House location</label>
                <TextField.Root
                  id="house_location"
                  className="hr-input"
                  size="3"
                  type="text"
                  name="house_location"
                  required
                  value={data.house_location}
                  onChange={datachange}
                  placeholder="e.g. Milimani, Kakamega"
                />
              </div>
            </div>
          </section>

          {/* ---------- Map location ---------- */}
          <section className="hr-section">
            <h2 className="hr-h2">Pin the location</h2>
            <p className="hr-hint">
              Use your current position, or choose a city and town and click the map
              to drop a pin on the exact spot.
            </p>

            <Button
              type="button"
              className="hr-btn"
              color="green"
              variant="soft"
              size="3"
              onClick={handleUseCurrentLocation}
            >
              <LocateFixed size={18} />
              Use current location
            </Button>

            <div className="hr-grid" style={{ marginTop: 20 }}>
              <div>
                <label className="hr-label" htmlFor="main">City</label>
                <select
                  id="main"
                  className="hr-select"
                  name="main"
                  value={towns.main}
                  onChange={town_change}
                >
                  <option value="">Choose a city</option>
                  {arr.map((c, index) => (
                    <option key={index} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="hr-label" htmlFor="sub">Town or area</label>
                <select
                  id="sub"
                  className="hr-select"
                  name="sub"
                  value={towns.sub}
                  onChange={town_change}
                >
                  <option value="">Choose a town</option>
                  {sub.map((t, index) => (
                    <option key={index} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hr-pair" style={{ marginTop: 20 }}>
              <Button
                type="button"
                className="hr-btn"
                color="green"
                variant="outline"
                size="3"
                onClick={use_location}
              >
                <MapPin size={18} />
                Show on map
              </Button>
              <Button
                type="button"
                className="hr-btn"
                color="green"
                variant={manual ? "solid" : "outline"}
                size="3"
                onClick={manual_handle}
              >
                <Crosshair size={18} />
                {manual ? "Stop pinning" : "Pin manually"}
              </Button>
            </div>

            {manual && <p className="hr-status">Click anywhere on the map to place the pin.</p>}

            <div className="hr-map">
              <div ref={mapContainerRef} />
            </div>
          </section>

          <div className="hr-submit">
            <Button type="submit" color="green" variant="solid" size="3">
              Register house
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register_Form;