import Accueil from '../views/home'
import Signup from '../views/Signup'
import posts from '../views/posts'
import login from '../views/Login'
import post from '../views/post'
import profile from '../views/profile'
import createPost from '../views/createPost'


export default [
    {path:'/' , component : Accueil},
    {path:'/Signup' , component: Signup},
    {path:'/login', component: login},
    {path:'/posts' , component: posts},
    {path:'/post/:id' , component: post},
    {path:'/profile' , component: profile},
    {path:'/createPost' , component: createPost}
]