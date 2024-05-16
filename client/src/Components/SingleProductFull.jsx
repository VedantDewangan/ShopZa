import React, { useEffect, useRef, useState } from 'react'
import { NavBar } from './NavBar'
import { Box, Button, Image, Text, useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RatingStar from './RatingStar'
import { useNavigate, Link } from 'react-router-dom';

export const SingleProductFull = () => {

    const { id } = useParams("id")
    const [productDetails, SetProductDetails] = useState();
    const [Rating, SetRating] = useState(0);
    const navigate = useNavigate();
    const [selectedImageIndex, SetSelectedImageIndex] = useState(0);
    const imageRefs = useRef([]);
    const [selectedSize, HandleSelectedSize] = useState("none");
    const toast = useToast();
    const [cart, SetCart] = useState(false);

    const handleGoBack = () => {
        navigate("/");
    };

    const AddingInCart = async () => {
        const arr = Object.keys(productDetails.availability);

        await axios.post("http://localhost:3000/api/addItemToCart", {
            userID: localStorage.getItem("ShopZa"),
            productID: id,
            quantity: 1,
            selectedSize: selectedSize,
            availability: arr
        });
    }

    const AddToCart = (e) => {
        if (!cart) {
            if (localStorage.getItem("ShopZa")) {
                if (selectedSize === "none") {
                    toast({
                        status: "error",
                        title: "Please select the size",
                        isClosable: 5000
                    })
                }
                else {
                    AddingInCart()
                    toast({
                        status: "success",
                        title: "Added To cart",
                        isClosable: 5000
                    })
                    e.target.innerText = "Go to cart"
                    SetCart(true);
                }
            }
            else {
                toast({
                    status: "error",
                    title: "Login First",
                    description: "It seems you are not login",
                    isClosable: 5000
                })
            }
        }
    }

    useEffect(() => {
        const getProductDetails = async () => {
            const { data } = await axios.get(`http://localhost:3000/api/getProductDetails?productID=${id}`)
            SetProductDetails(data[0])
            var sum = 0;
            Object.values(data[0].rating).forEach(rate => {
                sum += rate
            })
            sum = sum / (Object.values(data[0].rating).length)
            sum /= 3;
            SetRating(sum);
        }
        getProductDetails();
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:3000/api/itemInCart?userID=${localStorage.getItem("ShopZa")}&productID=${id}`);
            SetCart(data);
        }
        fetchData();
    }, [])

    return (
        <>
            <NavBar />
            {
                productDetails ?
                    <Box display={'flex'} justifyContent={'center'} >
                        <Box height={"90vh"} width={"50%"} display={'flex'} flexDirection={'column'} >
                            <Box margin={"20px 10px 10px 20px"} >
                                <span style={{ cursor: "pointer", fontSize: '30px' }} onClick={handleGoBack} className="material-symbols-outlined">
                                    arrow_back
                                </span>
                            </Box>
                            <Box display={'flex'} margin={'auto'} alignItems={'center'} justifyContent={'center'} >
                                <Box overflow={'scroll'} height={"80vh"} >
                                    {
                                        productDetails.Images.map((img, i) => {
                                            return (
                                                <Image display={'block'} margin={'auto'} key={i} ref={(el) => (imageRefs.current[i] = el)} style={{ imageRendering: 'pixelated', maxWidth: "100%" }} height={"100%"} src={img} />
                                            )
                                        })
                                    }
                                </Box>
                                <Box margin={"20px"} >
                                    {
                                        productDetails.Images.map((img, i) => {
                                            return (
                                                <Image key={i} onClick={() => { SetSelectedImageIndex(i); imageRefs.current[i].scrollIntoView({ behavior: 'smooth' }); }} cursor={'pointer'} border={"2px solid lightgrey"} margin={"5px 0px"} src={img} height={"80px"} width={"80px"} objectFit={'cover'} />
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box height={"90vh"} width={"50%"} margin={"10vh 0px 0px 0px"} >
                            <Text fontSize={'x-large'} opacity={0.9} >
                                {productDetails.title}
                            </Text>
                            <Text fontSize={'medium'} margin={'10px 0px'} >
                                {productDetails.description}
                            </Text>
                            <Box display={'flex'} margin={"12px 0px"} alignItems={'center'} gap={"15px"} >
                                <Text fontSize={'larger'} >
                                    {productDetails.newPrice}
                                </Text>
                                <Text opacity={0.5} textDecoration={'line-through'} >
                                    {productDetails.oldPrice}
                                </Text>
                            </Box>
                            <Box fontSize={'small'}>
                                <RatingStar rating={Rating} />
                            </Box>
                            <Text margin={"12px"} >
                                Select Size
                            </Text>
                            <Box display={'flex'} gap={"10px"} margin={"20px 10px"} >
                                {
                                    Object.keys(productDetails.availability).map((size) => {
                                        return (
                                            <button style={{
                                                padding: "10px 20px",
                                                borderRadius: "10px",
                                                backgroundColor: `${selectedSize === size ? 'black' : "lightgray"}`,
                                                color: `${selectedSize === size ? "white" : "black"}`
                                            }} onClick={() => {
                                                selectedSize === size ?
                                                    HandleSelectedSize("none")
                                                    :
                                                    HandleSelectedSize(size)
                                            }} >
                                                {size}
                                            </button>
                                        )
                                    })
                                }
                            </Box>
                            <Link to={cart ? "/cart" : null} >
                                <Button display={'block'} onClick={AddToCart} >
                                    {cart ? "Go To Cart" : "Add To Cart"}
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                    :
                    null
            }
        </>
    )
}
