import { Link } from 'react-router-dom'


const PostsList = ({ posts }) => {

    return (
        <div>
            {
                posts?.map(({ title, _id }) => {
                    return <Link key={_id} to={`/posts/${_id}`}>{title}</Link>

                })
            }
        </div>
    )
}

export default PostsList