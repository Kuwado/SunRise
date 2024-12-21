import FindRestaurant from '~/pages/user/FindRestaurant';

const routes = {
    admin: {
        dashboard: '/admin',
        productDetail: '/admin/product/:id',
        restaurantList: '/admin/products',
        productCreate: '/admin/product/create',
        customers: '/admin/customers',
    },

    user: {
        home: '/home',
        productList: '/products',
        restaurantDetail: '/restaurant/:restaurantId',
        cart: '/cart',
        userInfor: '/userInfor',
        findRestaurant: '/findRestaurant',
        favorite: '/favorite',
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
