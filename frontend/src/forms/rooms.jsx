import { useEffect, useRef } from "react";
import Cardimage from "../components/cards";
import { useState } from "react";
import { Card, Skeleton, Button } from "@radix-ui/themes";
import { Search, MapPin, Heart, LocateFixed, X } from "lucide-react";
import axios_client from "../axios/axios";
import "./maps";       
import { importLibrary } from "@googlemaps/js-api-loader";

const styles = `
.hm-page {
  --hm-900: #0f3d24;
  --hm-700: #166534;
  --hm-600: #15803d;
  --hm-500: #16a34a;
  --hm-100: #dcfce7;
  --hm-50: #f0fdf4;
  --hm-ink: #10251a;
  --hm-muted: #5b6f63;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding-bottom: 40px;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--hm-ink);
}

/* ---------- Intro hero ---------- */
.hm-hero {
  position: relative;
  overflow: hidden;
  padding: 40px 40px 34px;
  color: #fff;
  background:
    radial-gradient(circle at 92% 12%, rgba(255, 255, 255, 0.16) 0, transparent 38%),
    radial-gradient(circle at 78% 110%, rgba(255, 255, 255, 0.12) 0, transparent 42%),
    linear-gradient(135deg, var(--hm-900) 0%, var(--hm-600) 100%);
  border-radius: 18px;
  box-shadow: 0 18px 36px -20px rgba(15, 61, 36, 0.7);
}
.hm-hero h1 {
  margin: 0 0 10px;
  max-width: 620px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 38px;
  line-height: 1.12;
  font-weight: 700;
}
.hm-hero p {
  margin: 0 0 24px;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.55;
  color: #d8f3e1;
}
.hm-steps { display: flex; flex-wrap: wrap; gap: 10px; }
.hm-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
}

/* ---------- Listing header + grid ---------- */
.hm-list-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin: 34px 2px 18px;
}
.hm-list-title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--hm-900);
}
.hm-list-sub { margin: 4px 0 0; font-size: 15px; color: var(--hm-muted); }
.hm-count {
  padding: 5px 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--hm-700);
  background: var(--hm-100);
  border: 1px solid #b7e4c4;
  border-radius: 999px;
}
.hm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 440px), 1fr));
  gap: 18px;
}
.hm-empty {
  padding: 40px 20px;
  text-align: center;
  font-size: 16px;
  color: var(--hm-muted);
  background: #fff;
  border: 1px dashed #8fc4a0;
  border-radius: 14px;
}

/* ---------- Map modal ---------- */
.hm-modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  background: rgba(15, 61, 36, 0.28);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 250ms ease, visibility 0s linear 250ms;
}
.hm-modal.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 250ms ease, visibility 0s;
}
.hm-dialog {
  width: min(920px, 100%);
  max-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: #fff;
  border: 1px solid #d7ecdd;
  border-top: 4px solid var(--hm-600);
  border-radius: 16px;
  box-shadow: 0 24px 60px -20px rgba(15, 61, 36, 0.6);
}
.hm-dialog h2 {
  margin: 0 0 4px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--hm-900);
}
.hm-dialog p { margin: 0; font-size: 14px; line-height: 1.5; color: var(--hm-muted); }
.hm-map {
  width: 100%;
  height: clamp(260px, 56vh, 520px);
  overflow: hidden;
  background: var(--hm-100);
  border: 1px solid #d7ecdd;
  border-radius: 12px;
}
.hm-actions { display: flex; justify-content: flex-end; gap: 12px; }
.hm-actions button { height: 42px; padding: 0 20px; font-size: 15px; font-weight: 600; cursor: pointer; }

@media (max-width: 600px) {
  .hm-hero { padding: 28px 22px 24px; }
  .hm-hero h1 { font-size: 30px; }
  .hm-hero p { font-size: 16px; }
  .hm-dialog { padding: 18px; }
  .hm-actions { flex-direction: column-reverse; }
  .hm-actions button { width: 100%; }
}
`;

function Home(){
    const[loading,setloading]=useState(true);
    const [value,setvalue]=useState([]);
    const[crd,setcrd]=useState({lat:"",long:""})
    const[home,sethome]=useState({});
    const[track,settrack]=useState(false);
    const parentref=useRef(null);
    const refmap=useRef(null);
    const mark=useRef(null);
    const mark1=useRef(null);
const polylines = useRef([]);
    const fetch=async()=>{

        const data=await axios_client('/api/get_all?index=1');
        console.log(data.data.data);
        const rows=data.data.data.map((value)=>Object.values(value));
        setvalue(rows);
        console.log(rows);
        setloading(false);
        navigator.geolocation.getCurrentPosition((async(value)=>{
                setcrd({lat:value.coords.latitude,long:value.coords.longitude})
            }))
    }
    useEffect(()=>{
        fetch();
    },[])
    useEffect(()=>{
        if(loading){
            return;
        }
        if(refmap.current){
            return;
        }
        const ch=async()=>{
        const{Map}=await importLibrary("maps")
        
        refmap.current=new Map(parentref.current,{
        center:{lat:Number(crd.lat),lng:Number(crd.long)},zoom:12
        })
        console.log(Number(crd.lat),Number(crd.long))
        }
        
    
        ch();
    return ()=>{
        refmap.current=null
    }
    },[loading,crd])
    const ma = async () => {
  const origin = { lat: Number(crd.lat), lng: Number(crd.long) };

  if (mark.current) {
    mark.current.setPosition(origin);
  } else {
    mark.current = new window.google.maps.Marker({
      position: origin,
      map: refmap.current,
      title: "Locate",
    });
  }

  if (home.lat === undefined) {
    console.log("Pick a destination first");
    return;
  }

  try {
    const { Route } = await importLibrary("routes");

    const { routes } = await Route.computeRoutes({
      origin,
      destination: home,
      travelMode: "WALKING",
      fields: ["path", "viewport", "distanceMeters", "durationMillis"],
    });

    // clear any previous route
    polylines.current.forEach((p) => p.setMap(null));
    polylines.current = [];

    if (!routes || routes.length === 0) {
      console.log("No route found");
      return;
    }

    polylines.current = routes[0].createPolylines();
    polylines.current.forEach((p) => p.setMap(refmap.current));

    if (routes[0].viewport) {
      refmap.current.fitBounds(routes[0].viewport);
    }
  } catch (err) {
    console.error("Route error:", err);
  }
};
    function dest(value){
        const dir={
            lat:Number(value.lat),
            lng:Number(value.long)
        }
        sethome(dir);
        if(mark1.current){
            mark1.current.setPosition(dir);
        }else{
            mark1.current=new window.google.maps.Marker({
                position:dir,
                label:"Destination marker",
                map:refmap.current
            })
        }
        
    }

    const hero=(
        <section className="hm-hero">
            <h1>Find a home you'll love.</h1>
            <p>
                Browse available houses, see exactly where they are on the map,
                and shortlist the ones that feel right.
            </p>
            <div className="hm-steps">
                <span className="hm-step"><Search size={16} /> Browse listings</span>
                <span className="hm-step"><MapPin size={16} /> See it on the map</span>
                <span className="hm-step"><Heart size={16} /> Shortlist favourites</span>
            </div>
        </section>
    );

    if(loading){
    return(
    <>
    <style>{styles}</style>
    <div className="hm-page">
        {hero}
        <div className="hm-list-head">
            <div>
                <h2 className="hm-list-title">Available houses</h2>
                <p className="hm-list-sub">Loading the latest listings...</p>
            </div>
        </div>
        <div className="hm-grid">
            {[0,1,2,3].map((i)=>(
                <Skeleton key={i}>
                    <Card size={"5"} style={{height:"180px",borderRadius:"14px"}}></Card>
                </Skeleton>
            ))}
        </div>
    </div>
    </>
    )
}else{
        return(
    <>
    <style>{styles}</style>

    {/* Map modal: centered on screen with blurred backdrop */}
    <div
        className={`hm-modal${track?" open":""}`}
        aria-hidden={!track}
        onClick={(e)=>{if(e.target===e.currentTarget)settrack(false)}}
    >
        <div className="hm-dialog" role="dialog" aria-label="House location map">
            <div>
                <h2>Find your way</h2>
                <p>
                    The house is marked on the map. Press Current location to see
                    the walking route from where you are.
                </p>
            </div>
            <div className="hm-map">
                <div ref={parentref} style={{width:"100%",height:"100%"}}></div>
            </div>
            <div className="hm-actions">
                <Button type="button" onClick={()=>settrack(false)} variant="outline" color="green" size="3">
                    <X size={18} />
                    Exit
                </Button>
                <Button type="button" onClick={ma} variant="solid" color="green" size="3">
                    <LocateFixed size={18} />
                    Current location
                </Button>
            </div>
        </div>
    </div>

    <div className="hm-page">
        {hero}

        <div className="hm-list-head">
            <div>
                <h2 className="hm-list-title">Available houses</h2>
                <p className="hm-list-sub">
                    Tap Location on any house to see where it is and how to get there.
                </p>
            </div>
            <span className="hm-count">
                {value.length} {value.length===1?"house":"houses"}
            </span>
        </div>

        {value.length===0?(
            <div className="hm-empty">
                No houses have been listed yet. Check back soon.
            </div>
        ):(
            <div className="hm-grid">
                {value.map((data,index)=>((
                    <Cardimage key={index} clk={(value)=>{settrack(!track),dest(value)}} text={data} ></Cardimage>
                )))}
            </div>
        )}
    </div>
    </>
)
    }
}
export default Home;