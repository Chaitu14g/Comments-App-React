import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    inputValue: '',
    textAreaValue: '',
  }

  onInputValue = event => {
    const a = event.target.value
    this.setState({inputValue: a})
  }

  onTextAreaValue = event => {
    const a = event.target.value
    this.setState({textAreaValue: a})
  }

  onAddComment = event => {
    event.preventDefault()
    const {inputValue, textAreaValue} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newItem = {
      id: uuidv4(),
      inputValue,
      textAreaValue,
      liked: false,
      formatDistance: new Date(),
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newItem],
      inputValue: '',
      textAreaValue: '',
    }))
  }

  likeParaClicked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, liked: !eachComment.liked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteClicked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => id !== eachComment.id,
      ),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachItem => (
      <CommentItem
        key={eachItem.id}
        eachItem={eachItem}
        likeParaClicked={this.likeParaClicked}
        onDeleteClicked={this.onDeleteClicked}
      />
    ))
  }

  render() {
    const {commentsList, inputValue, textAreaValue} = this.state
    const noOfComments = commentsList.length
    return (
      <form className="main_container" onSubmit={this.onAddComment}>
        <h1 className="heading">Comments</h1>
        <div className="comment_input_container">
          <div className="comment_input_container_image_container">
            <img
              alt="comments"
              className="comment_input_container_image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
          </div>
          <div className="comment_input_container_sub">
            <p className="comment_input_container_sub_para">
              Say something about 4.0 Technologies
            </p>
            <input
              className="comment_input_container_sub_input_one"
              placeholder="Your Name"
              onChange={this.onInputValue}
              value={inputValue}
            />
            <textarea
              rows="5"
              cols="40"
              className="comment_input_container_sub_textarea"
              placeholder="Your Comment"
              onChange={this.onTextAreaValue}
              value={textAreaValue}
            />
            <button
              className="comment_input_container_sub_button"
              type="submit"
            >
              Add Comment
            </button>
          </div>
        </div>
        <hr className="horizontal_line" />
        <div className="comments_section_down">
          <button type="button" className="comments_section_down_button">
            {noOfComments}
          </button>
          <p className="comments_section_down_para">Comments</p>
        </div>
        <ul className="unList">{this.renderCommentsList()}</ul>
      </form>
    )
  }
}

export default Comments
