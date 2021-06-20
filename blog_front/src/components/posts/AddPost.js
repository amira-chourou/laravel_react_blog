import React, { useState } from "react";
import {
  Button,
  Form,
  Card,
  CardHeader,
  FormGroup,
  Label,
  Input,
 
} from "reactstrap";

export default function AddPost(props) {
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState("");
 
  const handleSubmit = (e) => {
    
    e.preventDefault();
    setSubmitted(true);
    
    if (content) {
    props.submit(content)
    setContent('');
    setSubmitted(false)
    }
  };
  return (
    <>
      <Card >
        <CardHeader color="info">Add post</CardHeader>

        <Form onSubmit={handleSubmit} >
        
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
      </Card>
    </>
  );
}
