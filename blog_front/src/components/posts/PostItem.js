import {
  Button,
  Card,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import React, { useState } from "react";
import Moment from "react-moment";
import 'moment/locale/fr';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import AddComment from "../comments/AddComments";
export default function PostItem(props) {
  //  const [userId, setUserId] = useState('');
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const [showFormComment, setShowFormComment] = useState(false);
  const toggleFormComment = () => setShowFormComment(!showFormComment);
  // delete Post
  function deletePost(id) {
    props.deletePost(id);
    toggleDelete();
  }
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState(props.content);

  // Edit Post
  const handleSubmit = (e, id) => {
    e.preventDefault();
    setSubmitted(true);
    if (content) {
      props.editPost(id, content);
      toggleEdit();
    }
  };

  //props add comment
  const saveComment = (comment, idPost) => {
    props.saveComment(comment, idPost);
  };

  //props delete comment
  const deleteComment = (id, idPost) => {
    props.deleteComment(id, idPost);
  };
  return (
    <>
      {" "}
      {/** Display edit and delete button if user connected is the author of the post */}
      <Card className="mb-4">
        {localStorage.getItem("id") == props.userId && (
          <CardHeader>
            <Row>
              <Col sm="12" md={{ size: 2, offset: 10 }} className="actions">
                <div>
                  <Button color="danger" onClick={toggleDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>{" "}
                  <Button color="warning" onClick={toggleEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>{" "}
                </div>
              </Col>
            </Row>
          </CardHeader>
        )}

        <div className="pt-4 pl-4 pb-4 post">
          <p className="author">
            {props.createdBy} <br />
          </p>
          <p className="time">
            <Moment locale="fr" format="LLL">
              {props.date}
            </Moment>
          </p>
          {props.content} <br />
          {props.comments && (
            <>
              <hr />
              <h5>
                {props.comments.length > 0 && props.comments.length} Comment
                {props.comments.length > 1 && "s"}
              </h5>
              {props.comments.map((comment) => {
                return (
                  <div key={comment.id}>
                    <div className="comment">
                      <p className="author">
                        {comment.user.name} <br />
                      </p>
                      <p className="time">
                        <Moment format="LLL" locale="fr">
                          {comment.updated_at}
                        </Moment>
                      </p>
                      {comment.comment}
                      <br />
                      {comment.user.id == localStorage.getItem("id") && (
                        <Button
                          color="danger"
                          onClick={() => {
                            deleteComment(comment.id, props.id);
                          }}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <Button color="info" onClick={toggleFormComment} className="m-2">
            Add comment
          </Button>
          {showFormComment && (
            <AddComment submit={(e) => saveComment(e, props.id)}></AddComment>
          )}
        </div>
      </Card>
      {/** Edit post form */}
      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>Edit post</ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleSubmit(e, props.id)}>
            <FormGroup>
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {submitted && !content && (
                <span className="invalid-feedback error">Required</span>
              )}
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                publish
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      {/** Delete Post Modal */}
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>Delete post</ModalHeader>
        <ModalBody>
        <p>Are you sure you want to delete this post?</p>
          <Button
            color="danger"
            type="submit"
            onClick={() => {
              deletePost(props.id);
            }}
          >
            Confirm
          </Button> 
          <Button color="secondary" onClick={toggleDelete}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}
