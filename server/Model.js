const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true
})

const MensProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Object
    },
    category: {
        type: Array
    },
    availability: {
        type: Object
    },
    Images: {
        type: Array
    }
}, {
    timestamps: true
})

const SummerProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Object
    },
    category: {
        type: Array
    },
    availability: {
        type: Object
    },
    Images: {
        type: Array
    }
}, {
    timestamps: true
})

const LatestProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Object
    },
    category: {
        type: Array
    },
    availability: {
        type: Object
    },
    Images: {
        type: Array
    }
}, {
    timestamps: true
})

const WomensProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Object
    },
    category: {
        type: Array
    },
    availability: {
        type: Object
    },
    Images: {
        type: Array
    }
}, {
    timestamps: true
})

const WishListSchema = mongoose.Schema({
    userID: {
        type: String
    },
    productID: {
        type: String
    }
}, {
    timestamps: true
});

const CartSchema = mongoose.Schema({
    userID: {
        type: String
    },
    productID: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    selectedSize: {
        type: String
    },
    availability: {
        type: Array
    }
}, {
    timestamps: true
})

const OrderSchema = mongoose.Schema({
    userID: {
        type: String
    },
    ProductDetails: {
        type: Array
    },
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_order_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const User = new mongoose.model("User", UserSchema)
const MensProduct = new mongoose.model("MensProduct", MensProductSchema)
const WomensProduct = new mongoose.model("WomensProduct", WomensProductSchema)
const LatestProduct = new mongoose.model("LatestProduct", LatestProductSchema)
const SummerProduct = new mongoose.model("SummerProduct", SummerProductSchema)
const Wishlist = new mongoose.model("Wishlist", WishListSchema);
const Cart = new mongoose.model("Cart", CartSchema);
const Order = new mongoose.model("Order", OrderSchema);

module.exports = { MensProduct, WomensProduct, User, Wishlist, Cart, Order, LatestProduct, SummerProduct }