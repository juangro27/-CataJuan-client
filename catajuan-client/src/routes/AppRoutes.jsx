import { Route, Routes } from "react-router-dom"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<p>INICIO</p>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/logout" element={<p>LOGOUT</p>} />
            <Route path="/aboutus" element={<p>ABOUT US</p>} />
            <Route path="/contact" element={<p>CONTACT</p>} />
            <Route path="/myprofile" element={<MyProfilePage />} />
            <Route path="/myprofile/edit" element={<p>EDIT PROFILE</p>} />
            <Route path="/users" element={<p>USERS</p>} />
            <Route path="/users/:id/edit" element={<EditUserPage />} />
            <Route path="/users/:id/my-posts" element={<p>MY POSTS</p>} />
            <Route path="/users/:id/favorites-posts" element={<p>FAVORITE POSTS</p>} />
            <Route path="/countries" element={<p>COUNTRIES</p>} />
            <Route path="/countries/:id" element={<p>COUNTRY</p>} />
            <Route path="/countries/:id/edit" element={<p>EDIT COUNTRY</p>} />
            <Route path="/countries/:id/comments/:comment/edit" element={<p>EDIT COMMENT IN COUNTRY</p>} />
            <Route path="/posts" element={<p>POSTS</p>} />
            <Route path="/posts/create" element={<p>CREATE POST</p>} />
            <Route path="/posts/:id" element={<p>POST</p>} />
            <Route path="/posts/:id/edit" element={<p>EDIT POST</p>} />
            <Route path="/posts/:id/comments/:comment/edit" element={<p>EDIT COMMENT IN POST</p>} />
            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes