import React from "react"
import replyIconDull from "./images/icon-reply-dull.svg"
import deleteIconDull from "./images/icon-delete-dull.svg"
import editIconDull from "./images/icon-edit-dull.svg"
import replyIconBright from "./images/icon-reply-bright.svg"
import deleteIconBright from "./images/icon-delete-bright.svg"
import editIconBright from "./images/icon-edit-bright.svg"
import CurrentUser from './CurrentUser'


function Reply(props) {
    const [isReplyUpVoted, setIsReplyUpVoted] = React.useState(false)
    const [isReplyDownVoted, setIsReplyDownVoted] = React.useState(false)
    const [replyClicked, setReplyClicked] = React.useState(false)
    const [editClicked, setEditClicked] = React.useState(false)
    const [deleteClicked, setDeleteClicked] = React.useState(false)
    const [typedReply, setTypedReply] = React.useState("")
    const [typedEdit, setTypedEdit] = React.useState(props.replyData.content)
    const [deleteIconOn, setDeleteIconOn] = React.useState(false)
    const [editIconOn, setEditIconOn] = React.useState(false)
    const [replyIconOn, setReplyIconOn] = React.useState(false)

    const allSpaces = text => text.split("").every(char => char === " ")
    const handleChange = event => setTypedReply(event.target.value)
    const handleEdit = event => setTypedEdit(event.target.value)

    const upVoteButtonStyle = {color: isReplyUpVoted ? '#fa00e5' : 'hsl(211, 10%, 45%)'}
    const downVoteButtonStyle = {color: isReplyDownVoted ? '#fa00e5' : 'hsl(211, 10%, 45%)'}
    const replyReplyButtonStyle = {marginLeft: (props.replyData.user.username === CurrentUser.username) ? '2%' : '34.5%'}
    const emptyReplyReplyButtonStyle= {
        backgroundColor: !allSpaces(typedReply) && typedReply.length > 0 ? 'hsl(238, 40%, 52%)' : 'gray', 
        cursor: !allSpaces(typedReply) && typedReply.length > 0 ? 'pointer' : 'default',
    }

    function handleUpVoteClick() {
        if(isReplyDownVoted) {
            setIsReplyDownVoted(false)
            props.increaseReplyScore(props.replyData.id, 2)
            setIsReplyUpVoted(true)
        } else if(isReplyUpVoted) {
            setIsReplyUpVoted(false)
            props.decreaseReplyScore(props.replyData.id, 1)
        } else {
            setIsReplyUpVoted(true)
            props.increaseReplyScore(props.replyData.id, 1)
        }
    }

    function handleDownVoteClick() {
        if(isReplyUpVoted) {
            setIsReplyUpVoted(false)
            props.decreaseReplyScore(props.replyData.id, 2)
            setIsReplyDownVoted(true)
        } else if(isReplyDownVoted) {
            setIsReplyDownVoted(false)
            props.increaseReplyScore(props.replyData.id, 1)
        } else {
            setIsReplyDownVoted(true)
            props.decreaseReplyScore(props.replyData.id, 1)
        }
    }

    function determineScoreColor() {
        if(props.replyData.score > 0) return '#00c300'
        else if(props.replyData.score < 0) return 'red'
        else if(props.replyData.score === 0) return 'black'
    }

    function sendReply() {
        if(!allSpaces(typedReply) && typedReply.length > 0) {    
            props.replyToReply(typedReply)
            setReplyClicked(false)
            setTypedReply("")
        }
    }

    function handleReplyClicked() {
        setReplyClicked(true)
    }

    function handleCancelClicked() {
        setReplyClicked(false)
    }

    const scoreStyle = {color: determineScoreColor()}

    function postEdit() {
        if(!allSpaces(typedEdit) && typedEdit.length > 0){    
            props.allReplyData.forEach(replyData => {
                if(replyData.id === props.id) {
                    replyData.content = typedEdit
                }
            })
        setEditClicked(false)
        }
    }

    function handleDeleteClicked() {
        setDeleteClicked(true)
        props.toggleTint(true)
    }

    function handleCancelDeleteClicked() {
        setDeleteClicked(false)
        props.toggleTint(false)
    }

    function deleteReply() {
        props.setAllReplyData(props.allReplyData.filter(replyData => replyData !== props.replyData))
        props.toggleTint(false)
    }

    return (
        <div>
            {deleteClicked && <div class="delete-warning-box">
                <div class="warning-title">Delete Comment</div>
                <div class="warning-message">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</div>
                <div class="warning-options">
                    <div onClick={handleCancelDeleteClicked} class="cancel-option">NO, CANCEL</div>
                    <div onClick={deleteReply} class="delete-option">YES, DELETE</div>
                </div>
            </div>}
            <div className="replies">
              <div className="reply-votes">
                <div className="reply-plus-button" style={upVoteButtonStyle} onClick={handleUpVoteClick}>+</div>
                <div className="reply-voteAmount" style={scoreStyle}>{props.replyData.score}</div>
                <div className="reply-minus-button" style={downVoteButtonStyle} onClick={handleDownVoteClick}>-</div>
              </div>
            
              <div className="reply-titles">
                <img src={require("./images/avatars/image-amyrobson.png")} alt="" className="reply-pfp"></img>
                <span className="reply-username">{props.replyData.user.username}</span>
                {(props.replyData.user.username === CurrentUser.username) && <span className="reply-user-indicator">you</span>}
                <span className="reply-datePosted">{props.replyData.createdAt}</span>
                {(props.replyData.user.username === CurrentUser.username) && 
                <span 
                    className="reply-delete-button" 
                    onMouseOver={() => setDeleteIconOn(true)} 
                    onMouseOut={() => setDeleteIconOn(false)}
                    onClick={handleDeleteClicked}
                ><img src={deleteIconOn ? deleteIconBright : deleteIconDull} alt="" className="reply-delete-logo"></img> Delete</span>}
                
                {(props.replyData.user.username === CurrentUser.username) && 
                <span 
                    className="reply-edit-button" 
                    onMouseOver={() => setEditIconOn(true)} 
                    onMouseOut={() => setEditIconOn(false)}
                    onClick={() => setEditClicked(true)}
                ><img src={editIconOn ? editIconBright : editIconDull} alt="" className="reply-edit-logo"></img> Edit</span>}
                
                <span className="reply-reply-button" style={replyReplyButtonStyle} onClick={handleReplyClicked} onMouseOver={() => setReplyIconOn(true)} onMouseOut={() => setReplyIconOn(false)}>
                    <img src={replyIconOn ? replyIconBright : replyIconDull} alt="" className="reply-reply-logo"></img> Reply
                </span>
              </div>
              {(editClicked === false) && <div className="reply-text"><span className="replying-to">@{props.replyData.replyingTo}</span>   {props.replyData.content}</div>}
                {editClicked && <textarea onChange={handleEdit} className="reply-edit-input" cols="44" rows="3" value={typedEdit} />}
                {editClicked && <div onClick={postEdit} className="reply-update-button">UPDATE</div>}
            </div>
            {replyClicked && <div className="empty-reply-reply">
                <textarea value={typedReply} onChange={handleChange} className="empty-reply-reply-input" cols="38" rows="3" placeholder="Send in a reply..."></textarea>
                <img src={require("./images/avatars/image-juliusomo.png")} alt="" className="empty-reply-reply-pfp"></img>
                <div className="empty-reply-reply-submit-button" onClick={sendReply} style={emptyReplyReplyButtonStyle}>REPLY</div>
                <div className="empty-reply-reply-cancel-button" onClick={handleCancelClicked}>CANCEL</div>
            </div>}
        </div>
    )
}


export default Reply