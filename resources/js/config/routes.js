import FindRestaurant from "~/pages/user/FindRestaurant";

const routes = {
    admin: {
        dashboard: '/admin',
        productDetail: '/admin/product/:id',
        productList: '/admin/products',
        productCreate: '/admin/product/create',
        customers: '/admin/customers',
    },

    user: {
        home: '/home',
        productList: '/products',
        productDetail: '/product/:productId/:variantId',
        cart: '/cart',
        userInfor: '/userInfor',
        findRestaurant: '/findRestaurant',
    },

    other: {
        login: '/login',
        register: '/register',
        landing: '/',
        forbidden: '/forbidden',
        test: '/test',
    },
};

export default routes;
