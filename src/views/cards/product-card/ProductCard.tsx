import Image from 'next/image'
import { Card, Typography } from "@mui/material"

const ProductCard = () =>{
    const src = `https://dkstatics-public.digikala.com/digikala-products/b0214f645db64a9c4b13a042da0136100a82d9a1_1676199654.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90`
return (
    <Card sx={{backgroundColor: '#000000'}}>
        <Image
        loader={()=>src}       
            src={src}
            alt={'sdf'} 
            width={500} 
            height={600}/>
            <Typography sx={{color:'#000000',backgroundColor:'#ff0000'}} >laptop asus fx506Hc</Typography>
    </Card>
)
}

export default ProductCard