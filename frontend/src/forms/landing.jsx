import { Avatar, Badge, Card, Inset, Text } from "@radix-ui/themes";
import { ArrowBigLeftIcon, ArrowLeft, ArrowRight, Bed, DogIcon, Dot, House, MapPin, ShieldUser, Wifi } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import im1 from "./images/im1.png";
import im2 from "./images/im2.png";
import im3 from "./images/im3.png";
import im4 from "./images/im4.png";
import profile from "./images/profile.png"
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
export default  function Landing(){
  const nav=useNavigate();
    const min=useMediaQuery({maxWidth:"768px"})
    const [filter,setfilter]=useState({all:false,bedsitter:false,single:false,apartment:false})
    
    const change=(value)=>{
        if(filter[value]){
            setfilter((data)=>({
                ...data,
                [value]:null
            }))
        }else{
            setfilter((data)=>({
                ...data,
                [value]:value
            }))
        }
    }
const cardWidth = min ? '100%' : '300px';
const listings=[
    {image:im1,beds:3,location:"Lurambi opposite Clutch",price:"5000",key:"bedroom"},
    {image:im2   ,
        beds:5,
        location:"Sichirai opposite Lumino Hospital",
        price:"14000",
        key:"bedroom"
    },
    {image:im3   ,
        beds:5,
        location:"Sichirai opposite Lumino Hospital",
        price:"14000",
        key:"bedroom"
    },
    {image:im4   ,
        beds:5,
        location:"Sichirai opposite Lumino Hospital",
        price:"14000",
        key:"bedroom"
    }


]
console.log(listings[0].image)
    return(
        <>
        <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:"#F7F5F0"}}>
            <div style={{width:"100%",height:"fit-content",display:"flex",flexDirection:"row",padding:"15px",
                background:"#FFFFFF",justifyContent:"center",alignItems:"center"}}>
                <div style={{width:"100%",height:"100%",display:"flex",gap:"5px",alignItems:"center"}}>
                <div style={{display:"flex",width:"fit-content",height:"fit-content",padding:'5px',background:"#2B3437",borderRadius:"10px"}}
                ><House size={"30"} color="#ffffff"></House>    
                </div>
                <Text size={"6"} weight={"medium"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                    Mmust Homes
                </Text>
                </div>
                <div style={{width:"fit-content",height:"100%",display:"flex",alignItems:"center"}}>
                <Avatar size={"3"} variant="soft" src={profile} radius="full"></Avatar>
                </div>
            </div>
            <div style={{padding:"15px",display:"flex",flexDirection:"column",width:'100%',height:"100%",gap:"10px"}}>
                <div style={{display:"flex",flexDirection:"column",width:'100%',height:"fit-content"}}>
                    <Text size={"7"} weight={"regular"} style={{fontFamily:"Plus Jakarta Sans",color:"#2B3437"}}>
                        Find your house today
                    </Text>
                    <Text size={"2"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:"#434749"}}>
                        Looking for an available rental find your house today
                    </Text>
                </div>
                <div style={{display:"flex",flexDirection:"row",width:'100%',height:"fit-content",gap:"8px"}}>
                    
                    <Badge style={{border:"dashed 1px black",width:"fit-content",borderRadius:"10px",background:filter.all?"#2B3437":"none"}} onClick={()=>change("all")}>
                        <Text size={"2"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:filter.all?"#FFFFFF":"#2B3437"}}>All</Text>
                    </Badge>
                    <Badge style={{border:"dashed 1px black",width:"fit-content",borderRadius:"10px",background:filter.bedsitter?"#2B3437":"none"}} onClick={()=>change("bedsitter")}>
                        <Text size={"2"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:filter.bedsitter?"#FFFFFF":"#2B3437"}}>Bedsitter</Text>
                    </Badge>
                    <Badge style={{border:"dashed 1px black",width:"fit-content",borderRadius:"10px",background:filter.single?"#2B3437":"none"}} onClick={()=>change("single")}>
                        <Text size={"2"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:filter.single?"#FFFFFF":"#2B3437"}}>Single</Text>
                    </Badge>
                     <Badge style={{border:"dashed 1px black",width:"fit-content",borderRadius:"10px",background:filter.apartment?"#2B3437":"none"}} onClick={()=>change("apartment")}>
                        <Text size={"2"} weight={"light"} style={{fontFamily:"Plus Jakarta Sans",color:filter.apartment?"#FFFFFF":"#2B3437"}}>Apartment</Text>
                    </Badge>
                </div>


<div
  style={{
    width: cardWidth,          // definite width, not fit-content
    minWidth: 0,
    maxWidth: '100%',
    
  }}
>
  <Carousel style={{ width: '100%' }} opts={{ align: 'start' }}>
    {/* remove default -ml-4 so the slides aren't offset */}
    <CarouselContent className="ml-0">
      {listings.map((item,key) => (
        // remove default pl-4 so the card gets the full slide width
        <CarouselItem key={key}  className="pl-0 basis-full">
          <Card
            size={2}
            style={{
              width: '100%',   // fill the slide, don't set its own width
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              background: '#FFFFFF',
            }}
          >
            <img
              src={item.image}
              alt=""
              style={{ display: 'block', objectFit: 'cover', width: '100%', height: '300px' }}
            />

            <div style={{ width: '100%', minWidth: 0, padding: '5px', boxSizing: 'border-box' }}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                <div style={{ gap: '3px', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                  <Text size="6" weight="light" style={{ fontFamily: 'Plus Jakarta Sans', color: '#2B3437' }}>
                    Ksh {item.price}
                  </Text>
                  <Text size="1" weight="light" style={{ fontFamily: 'Plus Jakarta Sans', color: '#434749', display: 'flex', gap: '5px' }}>
                    <MapPin size={15} color="#434749" />
                    {item.location}
                  </Text>
                </div>
                <Badge color="green" style={{ borderRadius: '5px', flexShrink: 0 }}>
                  <Text size="3" weight="regular" style={{ fontFamily: 'Plus Jakarta Sans' }}>Vacant</Text>
                </Badge>
              </div>

              <div
                style={{
                  marginTop: '10px', borderRadius: '10px', padding: '5px',
                  background: '#F7F5F0', width: '100%', boxSizing: 'border-box',
                  display: 'flex', flexDirection: 'row',
                  justifyContent: 'space-evenly', alignItems: 'center', gap: '10px',
                }}
              >
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Wifi color="#C86A4B" />
                  <Text size="3" style={{ color: '#2B3437', fontFamily: 'Plus Jakarta Sans' }}>Wifi</Text>
                </div>
                <Dot color="#C86A4B" />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Bed color="#C86A4B" />
                  <Text size="3" style={{ color: '#2B3437', fontFamily: 'Plus Jakarta Sans' }}>{item.beds}</Text>
                </div>
                <Dot color="#C86A4B" />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <ShieldUser color="#C86A4B" />
                  <Text size="3" style={{ color: '#2B3437', fontFamily: 'Plus Jakarta Sans' }}>Secure</Text>
                </div>
              </div>
            </div>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* default positions are -left-12 / -right-12, which your overflow:hidden wrapper clips */}
    <CarouselPrevious className="left-2" />
    <CarouselNext className="right-2" />
  </Carousel>
</div>

<div style={{width:"100%",height:"fit-content",gap:"15px",display:'flex',flexDirection:"column",marginTop:"10px",background:"#ce4213",padding:"10px",borderRadius:"10px"}}>
  <div
  style={{width:"100%",height:"fit-content",display:'flex',flexDirection:"column",gap:"5px"}}
  >
<Text size={"6"} weight={"medium"} style={{color:"#FFFFFF",fontFamily: 'Plus Jakarta Sans'}}>Find your home in one tap</Text>
  <Text size={"2"} weight={"medium"} style={{color:"#F7F5F0",fontFamily: 'Plus Jakarta Sans'}}>Stressing where to get a house, Wondering how many are within your budget, Does it meet your liking?
    ALl these are answered by Mmust homes house providers. Just create an account, login and find teh house of your dreams
   </Text>
  </div>
  
   <button style={{width:"200px",padding:"2px", background:"#FFFFFF",borderRadius:"8px"}} onClick={()=>nav("/login")}>
    <Text weight={"medium"} size={"5"} style={{gap:"10px",color:"#99462a",fontFamily: 'Plus Jakarta Sans',display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
    Login <ArrowRight></ArrowRight>
    </Text>
  
    </button>
</div>
            </div>

        </div>
        </>
    )
}