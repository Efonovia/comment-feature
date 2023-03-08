import React from 'react'
import Reply from './Reply'
import replyIconDull from "./images/icon-reply-dull.svg"
import deleteIconDull from "./images/icon-delete-dull.svg"
import editIconDull from "./images/icon-edit-dull.svg"
import replyIconBright from "./images/icon-reply-bright.svg"
import deleteIconBright from "./images/icon-delete-bright.svg"
import editIconBright from "./images/icon-edit-bright.svg"
import {nanoid} from "nanoid"
import timeElapsed from './timeElapsed'
import CurrentUser from "./CurrentUser"


function Comment(props) {
    const [allReplyData, setAllReplyData] = React.useState(props.commentData.replies)
    const [replyClicked, setReplyClicked] = React.useState(false)
    const [editClicked, setEditClicked] = React.useState(false)
    const [deleteClicked, setDeleteClicked] = React.useState(false)
    const [deleteIconOn, setDeleteIconOn] = React.useState(false)
    const [editIconOn, setEditIconOn] = React.useState(false)
    const [replyIconOn, setReplyIconOn] = React.useState(false)
    const [typedReply, setTypedReply] = React.useState("")
    const [typedEdit, setTypedEdit] = React.useState(props.commentData.content)
    const [isCommentUpVoted, setIsCommentUpVoted] = React.useState(false)
    const [isCommentDownVoted, setIsCommentDownVoted] = React.useState(false)
    
    const upVoteButtonStyle = {color: isCommentUpVoted ? '#fa00e5' : 'hsl(211, 10%, 45%)'}
    const downVoteButtonStyle = {color: isCommentDownVoted ? '#fa00e5' : 'hsl(211, 10%, 45%)'}
    const replyButtonStyle = {marginLeft: (props.commentData.user.username === CurrentUser.username) ? '28px' : '40.7%'}

    const handleChange = event => setTypedReply(event.target.value)
    const handleEdit = event => setTypedEdit(event.target.value)

    const allSpaces = text => text.split("").every(char => char === " ")
    const emptyReplyButtonStyle = {
        backgroundColor: !allSpaces(typedReply) && typedReply.length > 0 ? 'hsl(238, 40%, 52%)' : 'gray', 
        cursor: !allSpaces(typedReply) && typedReply.length > 0 ? 'pointer' : 'default',
    }
    const commentUpdateButtonStyle = {
        backgroundColor: !allSpaces(typedEdit) && typedEdit.length > 0 ? 'hsl(238, 40%, 52%)' : 'gray', 
        cursor: !allSpaces(typedEdit) && typedEdit.length > 0 ? 'pointer' : 'default',
    }

    function determineScoreColor() {
        if(props.commentData.score > 0) return '#00c300'
        else if(props.commentData.score < 0) return 'red'
        else if(props.commentData.score === 0) return 'black'
    }

    const scoreStyle = {color: determineScoreColor()}
    function upVote(id, num) {
        setAllReplyData(allReplyData => allReplyData.map(replyData => {
            return replyData.id === id ?
            {...replyData, score: (replyData.score + num)} :
            replyData
        }))
    }

    function downVote(id, num) {
        setAllReplyData(allReplyData => allReplyData.map(replyData => {
            return replyData.id === id ?
            {...replyData, score: (replyData.score - num)} :
            replyData
        }))
    }

    function sendReply() {
        if(!allSpaces(typedReply) && typedReply.length > 0){    
            setAllReplyData(prevAllReplyData => {
                return [
                    ...prevAllReplyData,
                    {
                        id: nanoid(),
                        content: typedReply,
                        createdAt: timeElapsed(new Date()),
                        score: 0,
                        replyingTo: props.commentData.user.username,
                        user: {
                            image: { 
                            png: "./images/avatars/image-ramsesmiron.png",
                            webp: "./images/avatars/image-ramsesmiron.webp"
                            },
                            username: "juliusomo"
                        }
                    },
                ]
            })
            setReplyClicked(false)
            setTypedReply("")
        }
    }

    function sendReplyReply(id, newReply) {
        allReplyData.forEach(replyData => {
            if(replyData.id === id){
                setAllReplyData(prevAllReplyData => {
                    return [
                        ...prevAllReplyData,
                        {
                            id: nanoid(),
                            content: newReply,
                            createdAt: timeElapsed(new Date()),
                            score: 0,
                            replyingTo: replyData.user.username,
                            user: {
                                image: { 
                                png: "./images/avatars/image-ramsesmiron.png",
                                webp: "./images/avatars/image-ramsesmiron.webp"
                                },
                                username: "juliusomo"
                            }
                        },
                    ]
                })
            }
        })
    }

    function handleUpVoteClick() {
        if(isCommentDownVoted) {
            setIsCommentDownVoted(false)
            props.increaseCommentScore(props.commentData.id, 2)
            setIsCommentUpVoted(true)
        } else if(isCommentUpVoted) {
            setIsCommentUpVoted(false)
            props.decreaseCommentScore(props.commentData.id, 1)
        } else {
            setIsCommentUpVoted(true)
            props.increaseCommentScore(props.commentData.id, 1)
        }
    }

    function handleDownVoteClick() {
        if(isCommentUpVoted) {
            setIsCommentUpVoted(false)
            props.decreaseCommentScore(props.commentData.id, 2)
            setIsCommentDownVoted(true)
        } else if(isCommentDownVoted) {
            setIsCommentDownVoted(false)
            props.increaseCommentScore(props.commentData.id, 1)
        } else {
            setIsCommentDownVoted(true)
            props.decreaseCommentScore(props.commentData.id, 1)
        }
    }

    function handleReplyClicked() {
        setReplyClicked(true)
    }

    function handleCancelClicked() {
        setReplyClicked(false)
        setTypedReply("")
    }
    
    function postEdit() {
        if(!allSpaces(typedEdit) && typedEdit.length > 0){    
            props.allCommentData.forEach(commentData => {
                if(commentData.id === props.id) {
                    commentData.content = typedEdit
                }
            })
        setEditClicked(false)
        }
    }

    function deleteComment() {
        props.setAllCommentData(props.allCommentData.filter(commentData => commentData !== props.commentData))
        props.toggleTint(false)
    }

    function handleDeleteClicked() {
        setDeleteClicked(true)
        props.toggleTint(true)
    }

    function handleCancelDeleteClicked() {
        setDeleteClicked(false)
        props.toggleTint(false)
    }

    const replyElements = allReplyData.map(replyData => {
        return <Reply 
                    key={replyData.id} 
                    id={replyData.id}
                    replyData={replyData}
                    allReplyData={allReplyData}
                    increaseReplyScore={upVote}
                    decreaseReplyScore={downVote}
                    replyToReply={(newReply) => sendReplyReply(replyData.id, newReply)}
                    toggleTint={props.toggleTint}
                    setAllReplyData={setAllReplyData}
                />
    })
    return (
        <div>
            {deleteClicked && <div class="delete-warning-box">
                <div class="warning-title">Delete Comment</div>
                <div class="warning-message">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</div>
                <div class="warning-options">
                    <div onClick={handleCancelDeleteClicked} class="cancel-option">NO, CANCEL</div>
                    <div onClick={deleteComment} class="delete-option">YES, DELETE</div>
                </div>
            </div>}
            <div className="commentArea">
                <div className="comment">
                  <div className="comment-votes">
                    <div className="comment-plus-button" style={upVoteButtonStyle} onClick={handleUpVoteClick}>+</div>
                    <div className="comment-voteAmount" style={scoreStyle}>{props.commentData.score}</div>
                    <div className="comment-minus-button" style={downVoteButtonStyle} onClick={handleDownVoteClick}>-</div>
                  </div>
            
                  <div className="comment-titles">
                    <img src={require("./images/avatars/image-amyrobson.png")} alt="" className="comment-pfp"></img>
                    <span className="comment-username">{props.commentData.user.username}</span>
                    {(props.commentData.user.username === CurrentUser.username) && <span className="comment-user-indicator">you</span>}
                    <span className="comment-datePosted">{props.commentData.createdAt}</span>
                    {(props.commentData.user.username === CurrentUser.username) && 
                    <span 
                        className="comment-delete-button" 
                        onMouseOver={() => setDeleteIconOn(true)} 
                        onMouseOut={() => setDeleteIconOn(false)}
                        onClick={handleDeleteClicked}
                    ><img src={deleteIconOn ? deleteIconBright : deleteIconDull} alt="" className="comment-delete-logo"></img> Delete</span>}
                    
                    {(props.commentData.user.username === CurrentUser.username) && 
                    <span 
                        className="comment-edit-button" 
                        onMouseOver={() => setEditIconOn(true)} 
                        onMouseOut={() => setEditIconOn(false)}
                        onClick={() => setEditClicked(true)}
                    ><img src={editIconOn ? editIconBright : editIconDull} alt="" className="comment-edit-logo"></img> Edit</span>}
                    
                    <span className="comment-reply-button" onMouseOver={() => setReplyIconOn(true)} onMouseOut={() => setReplyIconOn(false)} style={replyButtonStyle} onClick={handleReplyClicked}>
                        <img src={replyIconOn ? replyIconBright : replyIconDull} alt="" className="comment-reply-logo"></img> Reply
                    </span>
                  </div>
                  {(editClicked === false) && <div className="comment-text">{props.commentData.content}</div>}
                    {editClicked && <textarea className="comment-edit-input" value={typedEdit} onChange={handleEdit} cols="59" rows="3" />}
                    {editClicked && <div onClick={postEdit} style={commentUpdateButtonStyle} className="comment-update-button">UPDATE</div>}
                </div>
                {(replyClicked) && <div className="empty-reply">
                    <textarea value={typedReply} onChange={handleChange} className="empty-reply-input" cols="50" rows="3" placeholder="Send in a reply..." />
                    <img src={require("./images/avatars/image-juliusomo.png")} alt="" className="empty-reply-pfp"></img>
                    <div className="empty-reply-submit-button" onClick={sendReply} style={emptyReplyButtonStyle}>REPLY</div>
                    <div className="empty-reply-cancel-button" onClick={handleCancelClicked}>CANCEL</div>
                </div>}
                {replyElements}
            </div>
        </div>
    )
}


export default Comment