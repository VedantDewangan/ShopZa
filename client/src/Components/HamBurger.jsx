import React from 'react'
import { Box, ListItem, UnorderedList } from "@chakra-ui/react"
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const HamBurger = ({ page }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <Box className='HamBurger'>
            <Button ref={btnRef} color={'grey'} onClick={onOpen}>
                <span className="material-symbols-outlined">menu</span>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <UnorderedList listStyleType={'none'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >
                            <ListItem paddingTop={"100px"} >
                                <Link className='HamburgerNavList' to={"/"} style={{ opacity: page === "Home" ? 1 : 0.5 }} >HOME</Link>
                            </ListItem>
                            <ListItem paddingTop={"25px"} >
                                <Link className='HamburgerNavList' to={"/about-us"} style={{ opacity: page === "About" ? 1 : 0.5 }} >ABOUT US</Link>
                            </ListItem>
                            <ListItem paddingTop={"25px"} >
                                <Link className='HamburgerNavList' to={"/contact-us"} style={{ opacity: page === "Contact" ? 1 : 0.5 }} >CONTACT US</Link>
                            </ListItem>
                            <ListItem paddingTop={"25px"} >
                                <Link className='HamburgerNavList' to={"/orders"} style={{ opacity: page === "Orders" ? 1 : 0.5 }} >ORDERS</Link>
                            </ListItem>
                            <ListItem paddingTop={"25px"} >
                                <Link className='HamburgerNavList' to={"/cart"} style={{ opacity: page === "Cart" ? 1 : 0.5 }} >CART</Link>
                            </ListItem>
                            <ListItem paddingTop={"25px"} >
                                <Link className='HamburgerNavList' to={"/Wishlist"} style={{ opacity: page === "Wishlist" ? 1 : 0.5 }} >WISHLIST</Link>
                            </ListItem>
                            <ListItem paddingTop={"25px"} >
                                <Link className='HamburgerNavList' to={"/login"} style={{ opacity: page === "Login" ? 1 : 0.5 }} >{localStorage.getItem("ShopZa") ? "LOGOUT" : "LOGIN"}</Link>
                            </ListItem>
                        </UnorderedList>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </Box>
    )
}
