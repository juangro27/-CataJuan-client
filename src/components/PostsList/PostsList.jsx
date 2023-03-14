import { Link } from 'react-router-dom'
import postsService from '../../services/posts.service'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from '../../contexts/theme.context'
import capitalize from '../../utils/capitalize'
import getInitials from '../../utils/getInitials'
import Image from "../../assets/images/bg.jpg"
import { Card, Pagination, Avatar } from 'react-rainbow-components';


const PostsList = ({ posts }) => {


    const { themeSelected } = useContext(ThemeContext)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const handleClick = (e) => {

        e.preventDefault()

        postsService
            .deletePost(posts._id, posts.country)
            .then(() => navigate(`/countries/${posts.country}`))
            .catch(err => console.log(err))
    }
    return (
        <div className="content-card-container" >

            {
                posts?.map(({ title, _id, owner, score, country }) => {

                    let initials = getInitials(owner?.name, owner?.lastName)

                    return (
                        <Link to={`/posts/${_id}`} key={_id} className="post-card-container">
                            <Card
                                key={_id}
                                footer={`${country.flag} ${capitalize(country.name)}`}
                                className='post-card'
                                icon={
                                    <div className='post-card-header'>
                                        <p>{capitalize(title)}</p>
                                        <Avatar
                                            src={owner.avatar}
                                            initialsVariant="inverse"
                                            className={themeSelected.theme === 'light' ? "header-user-avatar header-user-avatar-light" : "header-user-avatar header-user-avatar-dark"}
                                            assistiveText={`${capitalize(owner.name)}`}
                                            title={`${capitalize(owner.name)}`}
                                            initials={initials}

                                        />
                                    </div>}
                            >
                                <img src={Image} alt="" />

                            </Card>

                        </Link>

                    )
                })
            }
        </div>
    )
}

export default PostsList