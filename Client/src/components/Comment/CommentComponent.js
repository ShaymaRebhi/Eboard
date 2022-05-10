import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Comment,
  Form,
  Header,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import {
  fetchCommentsCourse,
  selectComments,
  fetchCommentsTask,
} from "../../redux/slices/comment";
import { CommentsApi } from "../../utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputEmoji from "react-input-emoji";
import EditComment from "./EditComment";
import { isAuth } from "../../Helpers/Auth";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

function CommentComponent(props) {
  const idUserConnect = JSON.parse(localStorage.getItem("login")).User._id;
  const file = JSON.parse(localStorage.getItem("login")).User.file;
  const Name = JSON.parse(localStorage.getItem("Student")).Student.FirstName+" "+JSON.parse(localStorage.getItem("Student")).Student.LastName;



  const dispatch = useDispatch();
  useEffect(() => {
    if (props.courseID !== undefined) {
      dispatch(fetchCommentsCourse(props.courseID));
    } else {
      dispatch(fetchCommentsTask(props.taskID));
    }
  }, [dispatch]);
  const [commentss, er] = useSelector(selectComments);
  const [text, setText] = useState("");
  function handleOnEnter(text) {
    console.log("enter", text);
  }
  const formik = useFormik({
    initialValues: {
      Body: " ",
      Writer: { _id: "" + idUserConnect },
      Course: props.courseID,
      Task: props.taskID,
    },

    validationSchema: yupSchema,

    onSubmit: async (values) => {
      values.Body = text;

      try {
        if (values.Body !== " ") {
          console.log(values.Task);

          const res = await CommentsApi.postComments(values).then((data) => {
            if (data.Course !== null) {
              dispatch(fetchCommentsCourse(data.Course));
            } else if (data.Task !== null) {
              dispatch(fetchCommentsTask(data.Task));
            }
          });
        }
      } catch (error) {
        alert(error);
      }
    },
  });
  const deletecomment = async (idcomment) => {
    try {
      const res = await CommentsApi.deleteComments(idcomment);

      if (props.courseID != null) {
        console.log("course");
        dispatch(fetchCommentsCourse(props.courseID));
      } else if (props.taskID != null) {
        console.log("task");
        dispatch(fetchCommentsTask(props.taskID));
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <Comment.Group size="small">
        <div style={{ display: "flex" }}>
          <Comment>
            <Comment.Avatar as="a" src={file}></Comment.Avatar>
          </Comment>

          <InputEmoji
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          />
          <Form onSubmit={formik.handleSubmit}>
            <Button
              style={{ maxHeight: "40px" }}
              type="submit"
              content=""
              icon="edit"
            />
          </Form>
        </div>
        {Number(commentss.length) !== 0 && (
          <Header as="h3" dividing>
            Comments
          </Header>
        )}

        {commentss.map((commentt, index) => (
          <Comment key={index}>
            <Comment.Avatar as="a" src={commentt.Writer.file} />
            <Comment.Content>
              <Comment.Author as="a">{commentt.Writer.email.substring(0, 6)}</Comment.Author>
              <Comment.Metadata>
                
                <div>
                  <ReactTimeAgo
                  date={commentt.Date}
                   locale="en-US"/>
                </div>
              </Comment.Metadata>
              <Comment.Text>{commentt.Body}</Comment.Text>
              {commentt.Writer._id === idUserConnect && (
                <Comment.Actions>
                  
                  <Icon
                    name="delete"
                    onClick={() => deletecomment(commentt._id)}
                    color="red"
                  />
                  <EditComment comment={commentt} />
                  
                </Comment.Actions>
              )}
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </div>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
export default CommentComponent;
