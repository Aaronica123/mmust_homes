import { useEffect, useRef, useState } from "react";
import axios_client from "../axios/axios";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

// Set your Google Maps API Key here
const GOOGLE_MAPS_API_KEY = "AIzaSyD4BjaMjD3DyQGsNuHhYznRjKxRPWvtXVY";

// Configure the loader options once globally
setOptions({
  key: GOOGLE_MAPS_API_KEY,
  v: "weekly",
});

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
        <label>House Name</label>
        <input type="text" placeholder="enter house name" name="house_name" value={data.house_name} onChange={datachange}/>
        <label>House Type</label>
        <select  name="house_type" onChange={datachange}>
          <option  value={""}>Choose room type</option>
          <option  value={"bedroom"}>bedroom</option>
          <option  value={"bedsitter"}>bedsitter</option>
          <option  value={"single"}>single</option>
        </select>
        <label>Room type</label>
        {data.house_type=="single"?
        <input disabled placeholder="cannot enter room type"></input>
        :
        <input type="text" placeholder="enter room type" value={data.house_rooms} name="house_rooms" onChange={datachange}></input>}
        <label>User id</label>
        <input type="number" value={data.user_id} name="user_id" onChange={datachange}/>
        <label>House Location</label>
        <input type="text" name="house_location" value={data.house_location} placeholder="enter house location" onChange={datachange}/>
        <label>Rooms Available</label>
        <input type="number" name="house_available" value={data.house_available} onChange={datachange} placeholder="enter available houses"/>
        <button type="button" onClick={submit}>
          Submit
        </button>
      </form>

      {/* Button to trigger current location centering */}
      <div style={{ marginTop: "15px" }}>
        <button type="button" onClick={handleUseCurrentLocation}>
          Use Current Location
        </button>
        <select onChange={town_change} name="main">
          <option value={''}>Choose a town</option>
          {arr.map((data,index)=>(
            <option key={index} value={data} >{data}</option>
          ))}
        </select>
         <select onChange={town_change} name="sub">
         <option value="">Choose a city</option>
          {sub.map((data,index)=>(
            <option key={index} value={data}>{data}</option>
          ))}
        </select>
        <button onClick={se} type="button">Check</button>
        <button onClick={use_location} type="button">Filter Location</button>
        <button color="blue" type="button" onClick={manual_handle}>
          Use Manual Location
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