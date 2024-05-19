import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Text, Box, Skeleton } from '@chakra-ui/react'
import { SingleCard } from './SingleCard'
import { Link } from 'react-router-dom'

export const Section = ({ type }) => {

    const getProduct = async () => {
        SetLoading(true);
        const { data } = await axios.get(`http://localhost:3000/api/get${type}Product?limit=${5}&category=all`);
        SetLoading(false);
        SetProduct(data);
    }

    const [product, SetProduct] = useState([]);
    const [Loading, SetLoading] = useState(false)
    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <Box display={'flex'} justifyContent={'center'} marginTop={"10vh"} alignItems={'center'} >
                <hr style={{ width: "100%" }} />
                <Text width={'50vw'} textAlign={'center'} fontSize={"1.6em"} >
                    <span style={{
                        color: "red"
                    }} >
                        Explore
                    </span>
                    {
                        type === "Mens" ?
                            " Our Mens Collection" :
                            type === "Womens" ?
                                " Our Womens Collection" :
                                " Latest Product"
                    }
                </Text>
                <hr style={{ width: "100%" }} />
            </Box>
            <Box display={'flex'} justifyContent={'end'} padding={"2.8vh auto"} >
                <Link to={`/${type}Collection`} >
                    <Text display={'flex'} alignItems={'center'} gap={"5px"} cursor={'pointer'} padding={"5px 0px 20px 0px"} >
                        View All
                        <span class="material-symbols-outlined" style={{ paddingRight: "25px" }} >
                            east
                        </span>
                    </Text>
                </Link>
            </Box>
            <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                {Loading?
                <Box>
                    <Skeleton height={"100px"} />
                </Box>
                :product.map((product, i) => {
                    return (
                        <SingleCard key={i} productDetails={product} />
                    )
                })}
            </Box>
        </>
    )
}
