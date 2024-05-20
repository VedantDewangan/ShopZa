const { MensProduct, WomensProduct, User, Wishlist, Cart, Order, SummerProduct, LatestProduct } = require("./Model")
const bcrypt = require("bcryptjs")
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

var instance = new Razorpay({
    key_id: "process.env.RAZORPAY_KEY_ID",
    key_secret: "process.env.RAZORPAY_SECRET_ID",
});

const registerUser = async (req, res) => {

    const { email, password, confirm_password } = req.body

    try {
        const userEmail = await User.find({
            email: email
        })

        if (userEmail.length !== 0) {
            res.send({
                msg: "This Email is Alreday Registed",
                signup: false
            })
        }
        else {
            if (password.length < 8) {
                res.send({
                    msg: "Password should contain atleast 8 characters",
                    signup: false
                })
            }
            else if (confirm_password !== password) {
                res.send({
                    msg: "Passowrd and Confirm Password should be same",
                    signup: false
                })
            }
            else {
                const HasedPassword = await bcrypt.hash(password, 12);
                const user = await User.insertMany({
                    email: email,
                    password: HasedPassword
                })
                res.send({
                    signup: true,
                    userID: user[0]._id
                })
            }
        }
    } catch (error) {
        res.send({
            signup: false
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userEmail = await User.find({
            email: email
        })
        if (userEmail.length !== 0) {
            if (await bcrypt.compare(password, userEmail[0].password)) {
                res.send({
                    userID: userEmail[0]._id,
                    login: true
                })
            }
            else {
                res.send({
                    msg: "Incorrect password",
                    login: false
                })
            }
        }
        else {
            res.send({
                msg: "Email is not registred",
                login: false
            })
        }

    } catch (error) {
        res.send({
            login: false
        })
    }
}

const getMensProduct = async (req, res) => {
    const { limit } = req.query
    try {
        const product = await MensProduct.find().limit(Number(limit));
        res.send(product)
    } catch (error) {
        console.log(error);
    }
}

const getWomensProduct = async (req, res) => {
    const { limit } = req.query
    try {
        const product = await WomensProduct.find().limit(Number(limit));
        res.send(product)

    } catch (error) {
        console.log(error);
    }
}

const getLatestProduct = async (req, res) => {
    const { limit } = req.query
    try {
        const product = await LatestProduct.find().limit(Number(limit));
        res.send(product)

    } catch (error) {
        console.log(error);
    }
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getRandomData = async (req, res) => {
    try {
        const a = await MensProduct.find().limit(9);
        const b = await WomensProduct.find().limit(11);
        const c = await LatestProduct.find().limit(8);
        const d = await SummerProduct.find().limit(12);
        const e = [...a, ...b, ...c, ...d];
        const shuffledArray = shuffleArray(e);
        res.send(shuffledArray);
    } catch (error) {
        console.log(error);
    }
}

const getAllWishList = async (req, res) => {
    const { userID } = req.query;
    try {
        const wishList = await Wishlist.find({ userID: userID });
        const wishListedProduct = [];

        for (let i = 0; i < wishList.length; i++) {
            const { productID } = wishList[i];

            const mensProduct = await MensProduct.findOne({ _id: productID });
            const womensProduct = await WomensProduct.findOne({ _id: productID });
            const LatestProducts = await LatestProduct.findOne({ _id: productID });
            const SummerProducts = await SummerProduct.findOne({ _id: productID });

            if (mensProduct) {
                wishListedProduct.push(mensProduct);
            }
            if (womensProduct) {
                wishListedProduct.push(womensProduct);
            }
            if (SummerProducts) {
                wishListedProduct.push(SummerProducts)
            }
            if (LatestProducts) {
                wishListedProduct.push(LatestProducts)
            }
        }

        res.send(wishListedProduct);
    } catch (error) {
        console.log(error);
    }
}

const addRemoveWishlist = async (req, res) => {
    const { userID, productID } = req.body;
    try {
        const check = await Wishlist.find({
            userID: userID,
            productID: productID
        })

        if (check.length === 0) {
            const wishList = await Wishlist.insertMany({
                userID: userID,
                productID: productID
            })
            res.send({
                wishlist: true,
                msg: "Item added to wishlist"
            })
        }
        else {
            const wishList = await Wishlist.deleteOne({
                userID: userID,
                productID: productID
            })
            res.send({
                wishlist: false,
                msg: "Item removed from wishlist"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const checkItemInWishlist = async (req, res) => {
    const { productID, userID } = req.query;
    try {
        const wishList = await Wishlist.find({
            userID: userID,
            productID: productID
        })
        if (wishList.length === 0) {
            res.send(false)
        }
        else {
            res.send(true)
        }
    } catch (error) {
        console.log(error);
    }
}

const getProductDetails = async (req, res) => {
    const { productID } = req.query;
    try {
        const MProduct = await MensProduct.find({
            _id: productID
        })
        if (MProduct.length === 0) {
            const WProduct = await WomensProduct.find({
                _id: productID
            })
            if (WProduct.length === 0) {
                const LProduct = await LatestProduct.find({
                    _id: productID
                })
                if (LProduct.length === 0) {
                    const SProduct = await SummerProduct.find({
                        _id: productID
                    })
                    res.send(SProduct)
                }
                else {
                    res.send(LProduct)
                }
            }
            else {
                res.send(WProduct)
            }
        }
        else {
            res.send(MProduct);
        }
    } catch (error) {
        console.log(error);
    }
}

const itemInCart = async (req, res) => {
    const { userID, productID } = req.query
    try {
        const a = await Cart.find({
            userID: userID,
            productID: productID
        })
        if (a.length === 0) {
            res.send(false);
        }
        else {
            res.send(true);
        }
    } catch (error) {
        console.log(error);
    }
}

const addItemToCart = async (req, res) => {
    try {
        const { userID,
            productID,
            quantity,
            selectedSize,
            availability } = req.body
        const cart = await Cart.insertMany({
            userID: userID,
            productID: productID,
            quantity: quantity,
            selectedSize: selectedSize,
            availability: availability
        })
        res.send({
            msg: "Item added to cart"
        })
    } catch (error) {
        console.log(error);
    }
}

const getCartItem = async (req, res) => {
    const { userID } = req.query;
    try {
        const cart = await Cart.find({
            userID: userID
        })
        res.send(cart);
    } catch (error) {
        console.log(error);
    }
}

const deleteFromCart = async (req, res) => {
    const { userID, productID, size } = req.query;
    try {
        await Cart.deleteOne({
            userID: userID,
            productID: productID,
            selectedSize: size
        })
        res.send("done")
    } catch (error) {
        console.log(error);
    }
}

const checkOut = async (req, res) => {
    try {
        const { name, amount, userID, ProductDetails } = req.body;

        const order = await instance.orders.create({
            amount: amount * 100, // Convert to the smallest unit
            currency: "INR",
        });

        await Order.insertMany({
            name: name,
            amount: amount,
            order_id: order.id,
            userID: userID,
            ProductDetails: ProductDetails
        });

        res.send(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Internal Server Error");
    }
};

const paymentVerification = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).send('Invalid request body');
        }

        const body_data = `${razorpay_order_id}|${razorpay_payment_id}`;

        const secret = "process.env.RAZORPAY_SECRET_ID";
        const expectedSignature = crypto.createHmac('sha256', secret).update(body_data).digest('hex');

        console.log('Expected Signature:', expectedSignature);
        console.log('Razorpay Signature:', razorpay_signature);

        const isValid = expectedSignature === razorpay_signature;

        if (isValid) {
            console.log('Payment verified successfully');

            await Order.updateOne(
                { order_id: razorpay_order_id },
                {
                    $set: {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature
                    }
                }
            );

            res.redirect(`http://localhost:5173/payment/success?payment_id=${razorpay_payment_id}`);
        } else {
            console.log('Payment verification failed');
            res.redirect('http://localhost:5173/payment/failed');
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateOrder = async (req, res) => {
    const { order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    await Order.updateOne(
        { order_id: order_id },
        {
            $set: {
                razorpay_order_id: razorpay_order_id,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature
            }
        }
    );
    res.send({
        payment: true,
        order_id: order_id,
        payment_id: razorpay_payment_id
    });
}
const deleteCartItem = async (req, res) => {
    try {
        const { userID } = req.query;
        if (!userID) {
            return res.status(400).send({ msg: "userID is required" });
        }

        await Cart.deleteMany({ userID: userID });
        res.send({ success: true, msg: "Cart items deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart items:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

const allOrder = async (req, res) => {
    try {
        const { userID } = req.query;
        if (!userID) {
            return res.status(400).send({ msg: "userID is required" });
        }

        const orders = await Order.find({
            userID: userID,
            razorpay_order_id: { $ne: null }
        });
        res.send(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

const getAllMensCollection = async (req, res) => {
    try {
        const collection = await MensProduct.find();
        res.send(collection);
    } catch (error) {
        console.error("Error fetching men's collection:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

const getAllWomensCollection = async (req, res) => {
    try {
        const collection = await WomensProduct.find();
        res.send(collection);
    } catch (error) {
        console.error("Error fetching women's collection:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

const getAllLatestCollection = async (req, res) => {
    try {
        const collection = await LatestProduct.find();
        res.send(collection);
    } catch (error) {
        console.error("Error fetching latest collection:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

const getAllSummerCollection = async (req, res) => {
    try {
        const collection = await SummerProduct.find();
        res.send(collection);
    } catch (error) {
        console.error("Error fetching summer collection:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};


module.exports = {
    getMensProduct,
    getWomensProduct,
    registerUser,
    loginUser,
    addRemoveWishlist,
    getAllWishList,
    getProductDetails,
    addItemToCart,
    itemInCart,
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
    getAllLatestCollection,
    getAllMensCollection,
    getAllSummerCollection,
    getAllWomensCollection
}
