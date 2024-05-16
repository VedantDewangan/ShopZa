import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import axios from "axios";
import { SingleCard } from "./SingleCard"

export const WomenCategoryTab = () => {

    const getProduct = async () => {
        const { data } = await axios.get(`http://localhost:3000/api/getWomensProduct?limit=${5}&category=${category}`);
        SetProduct(data);
    }

    const [product, SetProduct] = useState([]);
    const [category, SetCategory] = useState("all");

    useEffect(() => {
        getProduct();
    }, [category])

    return (
        <>
            <Tabs variant='soft-rounded' colorScheme={"gray"}>
                <TabList display={'flex'} alignItems={'center'} justifyContent={'center'} gap={"10px"} >
                    <Tab value={"all"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >All Categories</Tab>
                    <Tab value={"Saree"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Saare</Tab>
                    <Tab value={"Dress"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Dress</Tab>
                    <Tab value={"Top"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Top</Tab>
                    <Tab value={"Sweatshirt"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Sweatshirt</Tab>
                    <Tab value={"Shirt"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Shirt</Tab>
                    <Tab value={"Tshirt"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Tshirt</Tab>
                    <Tab value={"jacket"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Jacket</Tab>
                    <Tab value={"Jeans"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Jeans</Tab>
                    <Tab value={"Trouser"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Trouser</Tab>
                    <Tab value={"Shorts"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Shorts</Tab>
                    <Tab value={"Bag"} onClick={(e) => {
                        SetCategory(e.target.value)
                    }} >Bag</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                            {product.map((product, i) => {
                                return (
                                    <SingleCard key={i} productDetails={product} />
                                )
                            })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                         <Box display={'flex'} width={"100%"} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'} >
                        {product.map((product, i) => {
                            return (
                                <SingleCard key={i} productDetails={product} />
                            )
                        })}
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>
    )
}
