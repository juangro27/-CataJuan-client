import { Link } from 'react-router-dom'


const PostsList = ({ posts }) => {

    return (
        <div>
            {
                posts?.map(({ title, _id }) => {
                    return <Link key={_id} to={`/posts/${_id}`}><p>{title}</p></Link>

                })
            }
        </div>
    )
}

export default PostsList