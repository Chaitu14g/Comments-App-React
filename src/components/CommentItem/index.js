import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachItem, likeParaClicked, onDeleteClicked} = props
  const {
    id,
    inputValue,
    textAreaValue,
    liked,
    initialClassName,
    formatDistance,
  } = eachItem
  const firstLetter = inputValue.slice(0, 1)
  const firstLetterCapital = firstLetter.toUpperCase()
  const time = formatDistanceToNow(formatDistance)
  const likeClicked = () => {
    likeParaClicked(id)
  }

  const deleteClicked = () => {
    onDeleteClicked(id)
  }

  const likeImgUrl = liked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeParaSet = liked ? 'when_liked_para' : ''

  return (
    <li className="commentItem_container">
      <div className="commentItem_top_container">
        <p className={`first_letter_para ${initialClassName}`}>
          {firstLetterCapital}
        </p>
        <div className="commentItem_text_container">
          <div className="commentItem_top_container">
            <h1 className="commentItem_heading ">{inputValue}</h1>
            <p className="commentItem_time">{time} ago</p>
          </div>
          <p className="commentItem_para">{textAreaValue}</p>
        </div>
      </div>
      <div className="commentItem_bottom_container">
        <img
          alt="like"
          className="commentItem_bottom_container_like_image"
          src={likeImgUrl}
        />
        <button
          type="button"
          onClick={likeClicked}
          className={`commentItem_bottom_container_like_para ${likeParaSet}`}
        >
          Like
        </button>
        <button
          className="commentItem_bottom_container_delete_button"
          type="button"
          onClick={deleteClicked}
          id="delete"
        >
          <img
            alt="delete"
            className="commentItem_bottom_container_delete_image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
      <hr className="commentItem_horizontal_line" />
    </li>
  )
}

export default CommentItem
