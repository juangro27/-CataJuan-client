import { useContext, useState } from "react"
import { Form } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { ActivityTimeline, Avatar, TimelineMarker, Button } from "react-rainbow-components"
import commentsService from "../../services/comments.service"
import getInitials from "../../utils/getInitials"
import capitalize from "../../utils/capitalize"
import { ThemeContext } from "../../contexts/theme.context"
import { Link } from "react-router-dom"

const CommentsList = ({ refreshComments, specs, commentsData }) => {

    const [isEdit, setIsEdit] = useState({ status: false, index: null })
    const [commentValue, setCommentValue] = useState('')
    const { user } = useContext(AuthContext)
    const { themeSelected } = useContext(ThemeContext)


    const handleInputChange = (e) => {

        const { value } = e.target
        setCommentValue(value)

    }

    const changeIsEdit = (status, index, comment) => {

        setIsEdit({ status, index })
        setCommentValue(comment)

    }

    const saveComment = (id) => {

        const comment = { comment: commentValue }

        commentsService
            .editComment(id, comment)
            .then(() => {
                setIsEdit({ status: null, index: null })
                refreshComments()
            })
            .catch(err => console.log(err))

    }

    const deleteComment = (id) => {

        commentsService
            .deleteComment(specs.type, specs.id, id)
            .then(() => {
                refreshComments()
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="comments-container">
            <ActivityTimeline >
                {
                    commentsData?.map((comment, index) => {
                        const { owner } = comment
                        const name = capitalize(owner.name)
                        let initials
                        if (owner) initials = getInitials(owner?.name, owner?.lastName)
                        return (
                            (isEdit.status && index === isEdit.index)
                                ?
                                <Form.Group className="mb-3" controlId="comment" key={comment._id}>
                                    <Form.Label>Comment:</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={commentValue} onChange={handleInputChange} />
                                    <Button onClick={() => changeIsEdit(null)}>Cancel</Button>
                                    <Button onClick={() => saveComment(comment._id, index)}>Save</Button>
                                </Form.Group>
                                :
                                <TimelineMarker
                                    key={comment._id}
                                    label={<Link className="comment-owner" to={`./users/${comment.owner._id}`}>{capitalize(comment.owner.name)}</Link>}
                                    icon={
                                        <Avatar
                                            src={owner.avatar}
                                            initialsVariant="inverse"
                                            className={themeSelected.theme === 'light' ? "header-user-avatar header-user-avatar-light" : "header-user-avatar header-user-avatar-dark"}
                                            assistiveText={`${capitalize(owner.name)}`}
                                            title={`${capitalize(owner.name)}`}
                                            initials={initials}

                                        />
                                    }
                                    datetime={comment.createdAt}
                                    description={
                                        <div className="comment-data">

                                            {capitalize(comment.comment)}

                                            {

                                                (owner._id === user?._id || user?.role === 'ADMIN') &&
                                                <div>
                                                    <Button onClick={() => changeIsEdit(true, index, comment.comment)}>Edit</Button>
                                                    <Button onClick={() => deleteComment(comment._id)}>Delete</Button>
                                                </div>
                                            }
                                        </div>
                                    }
                                />


                        )
                    })
                }
            </ActivityTimeline >
        </div >
    )

}

export default CommentsList