import axios from "axios";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ReadPost = ({ post, onClose, onPostUpdated }) => {
  const [editedPost, setEditedPost] = useState(post);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleUpdatePost = async () => {
    try {
      await axios.put('https://api.example.com/updatePost', editedPost); // Replace with your API URL
      onPostUpdated(); // Refresh the post list after updating the post
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://api.example.com/deletePost/${editedPost.id}`); // Replace with your API URL
      onPostUpdated(); // Refresh the post list after deleting the post
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Modal isOpen={true} toggle={onClose}>
      <ModalHeader toggle={onClose}>
        Post Details
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="postTitle">Title</Label>
            <Input
              type="text"
              id="postTitle"
              name="title"
              value={editedPost.title}
              onChange={handleFormChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="postContent">Content</Label>
            <Input
              type="textarea"
              id="postContent"
              name="content"
              value={editedPost.content}
              onChange={handleFormChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdatePost}>Save</Button>
        <Button color="danger" onClick={handleDeletePost}>Delete</Button>
        <Button color="secondary" onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReadPost;
