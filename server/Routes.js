const express = require("express");
const router = express.Router();
const { registerUser,
    loginUser,
    getMensProduct,
    getWomensProduct,
    addRemoveWishlist,
    getAllWishList,
    getProductDetails,
    itemInCart,
    addItemToCart,
    getCartItem,
    checkItemInWishlist,
    getLatestProduct,
    deleteFromCart,
    checkOut,
    paymentVerification,
    updateOrder,
    deleteCartItem,
    allOrder,
    getRandomData,
    getAllSummerCollection,
    getAllMensCollection,
    getAllWomensCollection,
    getAllLatestCollection
} = require("./Controller")

router.post("/signup", registerUser)
router.post("/login", loginUser)

router.get("/getMensProduct", getMensProduct)
router.get("/getWomensProduct", getWomensProduct)
router.get("/getLatestProduct", getLatestProduct)
router.get("/getProductDetails", getProductDetails)
router.get("/getRandomData", getRandomData)

router.get("/getAllWishList", getAllWishList)
router.get("/checkWishList", checkItemInWishlist)
router.post("/addRemoveWishlist", addRemoveWishlist)

router.delete("/deleteCartItem", deleteCartItem)
router.get("/itemInCart", itemInCart)
router.post("/addItemToCart", addItemToCart)
router.get("/getCartItem", getCartItem)
router.delete("/deleteFromCart", deleteFromCart)

router.post("/payment/checkout", checkOut)
router.put("/updateOrder", updateOrder)
router.post("/payment/payment-verification", paymentVerification)
router.get("/getAllOrder", allOrder)

router.get("/getAllSummerCollection", getAllSummerCollection)
router.get("/getAllMensCollection", getAllMensCollection)
router.get("/getAllWomensCollection", getAllWomensCollection)
router.get("/getAllLatestCollection", getAllLatestCollection)

module.exports = { router }