import {createRouter,createWebHistory} from 'vue-router'
import admin from './components/admin.vue'
import helloworld from './components/HelloWorld.vue'

const routes=[
    {path:'/',
    component:helloworld},
    {path:'/admin',
    component:admin},

];

const router = createRouter({
    routes:routes,
    history:createWebHistory()
});

export default router;