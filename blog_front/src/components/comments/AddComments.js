import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
 
} from "reactstrap";

export default function AddComment(props) {
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
 
  const handleSubmit = (e,id) => {
    
    e.preventDefault();
    setSubmitted(true);
    
    if (comment) {
    props.submit(comment,id)
    setComment('');
    setSubmitted(false)
    }
  };
  return (
    <>


        <Form onSubmit={(e) => handleSubmit(e, props.id)} >
        
          <FormGroup>
            <Label for="comment">Comment</Label>
            <Input
              type="textarea"
              name="content"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {submitted && !comment && (
              <span className="invalid-feedback error">Required</span>
            )}
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              publish
            </Button>
          </FormGroup>
        </Form>
   
    </>
  );
}

