import React from "react";
import Comment from "./Comment";
import Data from "./data";
import {nanoid} from "nanoid"
import timeElapsed from "./timeElapsed";

function App() {
    const [allCommentData, setAllCommentData] = React.useState(Data)
    const [typedComment, setTypedComment] = React.useState("")
    const [tintOn, setTintOn] = React.useState(false)

    const handleChange = event => setTypedComment(event.target.value)
    const allSpaces = text => text.split("").every(char => char === " ")
    const submitButtonStyle= {
        backgroundColor: !allSpaces(typedComment) && typedComment.length > 0 ? 'hsl(238, 40%, 52%)' : 'gray', 
        cursor: !allSpaces(typedComment) && typedComment.length > 0 ? 'pointer' : 'default',
    }
    
    
    function upVote(id, num) {
        setAllCommentData(prevAllCommentData => prevAllCommentData.map(commentData => {
            return commentData.id === id ?
            {...commentData, score: (commentData.score + num)} :
            commentData
        }))
    }

    function downVote(id, num) {
        setAllCommentData(prevAllCommentData => prevAllCommentData.map(commentData => {
            return commentData.id === id ?
            {...commentData, score: (commentData.score - num)} :
            commentData
        }))
    }

    function postComment(event) {
        event.preventDefault()
        if(!allSpaces(typedComment) && typedComment.length > 0){
            setAllCommentData(prevCommentData => {
            return [
                    ...prevCommentData,
                    {
                        id: nanoid(),
                        content: typedComment,
                        createdAt: timeElapsed(new Date()),
                        score: 0,
                        user: {
                            image: { 
                            png: "./images/avatars/image-juilusomo.png",
                            webp: "./images/avatars/image-juilusomo.webp"
                            },
                            username: "juliusomo"
                        },
                        replies: []
                    }
                ]
            })
            setTypedComment("")
        }
    }
    

    const commentElements = allCommentData.map(commentData => {
        return <Comment 
                    key={commentData.id} 
                    id={commentData.id} 
                    commentData={commentData} 
                    allCommentData={allCommentData} 
                    increaseCommentScore={upVote}
                    decreaseCommentScore={downVote}
                    setAllCommentData={setAllCommentData}
                    toggleTint={setTintOn}
                />
    })
    return(
        <div>
            {tintOn && <div class="tint-cover">
            </div>}
            <div className="commentSection">
                {commentElements}
            </div>
            <form className="inputArea">
                <img src={require("./images/avatars/image-juliusomo.png")} alt="" className="messagepfp"></img>
                <textarea value={typedComment} onChange={handleChange} className="message-input" cols="45" rows="3" placeholder="Add a comment..." />
                <button type="button" style={submitButtonStyle} onClick={postComment} className="submit">SEND</button>
            </form>
        </div>
    )
}

export default App