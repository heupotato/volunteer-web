import  React from "react";
function Comment(props){
    console.log(props);
    //props.id là id của cmt nè 
    //xài axios từ id của cmt get hết thông tin ra nè 
    var comment = {
        img: "https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png", 
        name: "Name", 
        time: "25-3-2021",
        content: "Content of comment",
		id : props.id
    }

	// useEffect(() => {
	// 	CommentService.getCommentId(comment.id).then( res => {
	// 		SetComment(res.data)
	// 	}).catch( err => console.log(err))
	// })	
	comment.name = props.comment.username; 
	comment.time = props.comment.createdDate; 
	comment.content = props.comment.content; 
	
    return(
        <div className="be-comment">
		<div className="be-img-comment">	
				<img src={comment.img} alt="" className="be-ava-comment"/>
		</div>
		<div className="be-comment-content">
				<span className="be-comment-name">
					{comment.name}
					</span>
				<span className="be-comment-time">
					<i className="fa fa-clock-o"></i>
					{" " + comment.time}
				</span>

			<p className="be-comment-text">
				{comment.content}
			</p>
		</div>
	</div>
    );
}
export default Comment;