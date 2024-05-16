import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Text, Box } from '@chakra-ui/react'
import { SingleCard } from './SingleCard'

export const Section = ({ type }) => {

    const getProduct = async () => {
        const { data } = await axios.get(`http://localhost:3000/api/get${type}Product?limit=${5}&category=all`);
        SetProduct(data);
    }

    const [product, SetProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <Text textAlign={'center'} fontSize={"1.6em"} marginTop={"10vh"} >
                Explore
                {
                    type === "Mens" ?
                        " Our Mens Collection" :
                        type === "Womens" ?
                            " Our Womens Collection" :
                            " Latest Product"
                }
            </Text>
            <Box display={'flex'} justifyContent={'end'} padding={"2.8vh auto"} >
                <Text display={'flex'} alignItems={'center'} gap={"5px"} cursor={'pointer'} padding={"5px 0px 20px 0px"} >
                    View All
                    <span class="material-symbols-outlined" style={{ paddingRight: "25px" }} >
                        east
                    </span>
                </Text>
            </Box>
            <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                {product.map((product, i) => {
                    return (
                        <SingleCard key={i} productDetails={product} />
                    )
                })}
            </Box>
        </>
    )
}
