import React, { useEffect, useRef, useState } from 'react'
import { NavBar } from './NavBar'
import { Box, Button, Image, Skeleton, Text, useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RatingStar from './RatingStar'
import { useNavigate, Link } from 'react-router-dom';
import { SingleCard } from './SingleCard'
import { Footer } from "./Footer"
import { ImageSlider } from './ImageSlider'

export const SingleProductFull = () => {

    const { id } = useParams("id")
    const [productDetails, SetProductDetails] = useState();
    const [Rating, SetRating] = useState(0);
    const navigate = useNavigate();
    const [selectedSize, HandleSelectedSize] = useState("none");
    const toast = useToast();
    const [cart, SetCart] = useState(false);

    const handleGoBack = () => {
        navigate("/");
    };

    const [randomProduct, SetRandomProduct] = useState([]);
    const [AddToCartLoading, SetAddToCartLoading] = useState(false);
    const [Loading, SetLoading] = useState(false);

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
            SetLoading(true);
            const { data } = await axios.get(`http://localhost:3000/api/getProductDetails?productID=${id}`)
            SetProductDetails(data[0])
            var sum = 0;
            Object.values(data[0].rating).forEach(rate => {
                sum += rate
            })
            sum = sum / (Object.values(data[0].rating).length)
            sum /= 3;
            SetRating(sum);
            SetLoading(false);
        }
        getProductDetails();
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:3000/api/itemInCart?userID=${localStorage.getItem("ShopZa")}&productID=${id}`);
            SetCart(data);
        }
        fetchData();
        const getARandomProduct = async () => {
            const { data } = await axios.get("http://localhost:3000/api/getRandomData")
            SetRandomProduct(data);
        }
        getARandomProduct();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id])

    return (
        <>
            <NavBar />
            {
                Loading ?
                    <>
                        <Box>
                            <Skeleton height={"200px"} />
                        </Box>
                    </>
                    :
                    productDetails ?
                        <>
                            <Box display={'flex'} justifyContent={'center'} id='singleProduct' >
                                <Box height={"90vh"} className='singleProduct1' display={'flex'} flexDirection={'column'} >
                                    <Box margin={"20px 10px 10px 20px"} >
                                        <span style={{ cursor: "pointer", fontSize: '30px' }} onClick={handleGoBack} className="material-symbols-outlined">
                                            arrow_back
                                        </span>
                                    </Box>
                                    <ImageSlider productDetails={productDetails} />
                                </Box>
                                <Box height={"90vh"} className='singleProduct1 singleProduct2' margin={"10vh 0px 0px 0px"} >
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
                            <Text textAlign={'center'} margin={"30px auto"} fontWeight={500} fontSize={"x-large"}>
                                View More Product
                            </Text>
                            <Box padding={"20px 30px"} display={'flex'} gap={"30px"} marginBottom={"14vh"} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'} >
                                {
                                    randomProduct.map((product, i) => {
                                        return (
                                            <SingleCard
                                                key={i}
                                                productDetails={product}
                                                newProduct={true}
                                            />

                                        )
                                    })
                                }
                            </Box>
                            <Footer />

                        </>
                        :
                        null
            }
        </>
    )
}
