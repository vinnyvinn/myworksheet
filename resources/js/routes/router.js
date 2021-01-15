import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Worksheet from "../components/worksheets/Index";

Vue.use(VueRouter);
function guard(to, from, next) {
    if (User.loggedIn()) {
        next();
    } else {
        next('/login');
    }
}
const routes = [
    {path:'/login',component: Login},
    {path:'/signup',component: Register},
    {path:'/users',component: Worksheet, beforeEnter: guard}
];

export default new VueRouter({
    routes,
    mode: 'history'
});
