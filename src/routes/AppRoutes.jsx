import { Route, Routes } from "react-router-dom"
import CountriesPage from "../pages/CountriesPage/CountriesPage"
import CountryDetailsPage from "../pages/CountryDetailsPage/CountryDetailsPage"
import CountryEditPage from "../pages/CountryEditPage/CountryEditPage"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import NewPostPage from "../pages/NewPostPage/NewPostPage"
import PostPage from "../pages/PostPage/PostPage"
import EditPostPage from "../pages/EditPostPage/EditPostPage"
const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<p>INICIO</p>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/aboutus" element={<p>ABOUT US</p>} />
            <Route path="/contact" element={<p>CONTACT</p>} />
            <Route path="/myprofile" element={<MyProfilePage />} />
            <Route path="/myprofile/edit" element={<p>EDIT PROFILE</p>} />
            <Route path="/users" element={<p>USERS</p>} />
            <Route path="/users/:id/edit" element={<EditUserPage />} />
            <Route path="/users/:id/my-posts" element={<p>MY POSTS</p>} />
            <Route path="/users/:id/favorites-posts" element={<p>FAVORITE POSTS</p>} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/:id" element={<CountryDetailsPage />} />
            <Route path="/countries/:id/edit" element={<CountryEditPage />} />
            <Route path="/posts" element={<p>POSTS</p>} />
            <Route path="/posts/create" element={<NewPostPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/:id/edit" element={<EditPostPage />} />
            <Route path="*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes