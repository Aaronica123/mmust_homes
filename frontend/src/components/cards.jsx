import {Badge, Card, Inset, Text} from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
export default function Cardimage({text}){
    console.log(text)
    return(

        <>
        {/* <p>Hello</p> */}
        <Card size={"2"} style={{background:"whitesmoke 80%",borderRadius:"10px",
            flexDirection:"column",display:"flex",width:"100%",height:"100%",padding:"10px"}}> 
            <div style={{width:"100%",height:"100%",flexDirection:"row",display:"flex",gap:"5px"}}>
            <Inset clip={"padding-box"} pb={"current"} side={"left"}>
                <img src="https://i.pinimg.com/736x/3c/55/f4/3c55f4e4cf85f4e755cda28b9c0add3e.jpg" alt={"house image"} 
                style={{objectFit:"cover",width:"100px",height:"100%",display:"flex",flexWrap:"nowrap",borderRadius:"5px"}}></img>
            </Inset>
            
            <div style={{width:"100%",display:"flex",flex:"column",height:"fit-content",flexDirection:"column"}}>
            {text.map((data,index)=>(
                (index==0?
                <div style={{width:"100%",display:"flex"}}>
                <Text size={"5"} style={{fontWeight:"bolder", fontFamily:"sans-serif",whiteSpace:"nowrap"}}>
                    {data}
                </Text>
                </div>:index==1?
                <Text size={"5"} style={{fontWeight:"bolder", fontFamily:"sans-serif",whiteSpace:"nowrap"}}>
                    {data}
                </Text>
                :index==2?
                <Text size={"5"} style={{fontWeight:"bolder", fontFamily:"sans-serif",whiteSpace:"nowrap"}}>
                    {data}
                </Text>:
                <Text size={"5"} style={{fontWeight:"bolder", fontFamily:"sans-serif",whiteSpace:"nowrap"}}>
                    {data}
                </Text>)
                )
            )}
            <div style={{width:"100%",height:"fit-content",display:"flex",justifyContent:"left"}}>
            <Button variant="classic">Shortlist</Button>
            </div>
            </div>
            </div>
            
            
        </Card>
        </>
    )
}