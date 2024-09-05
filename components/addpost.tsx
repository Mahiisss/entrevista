import { TextField, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../helpers/_frontendConstants";
import { selectCreds } from "../store/userSlice";
import { newPostContainer } from "../styles/items";

export default function AddPost() {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const credSelector = useSelector(selectCreds);

  function SubmitPost() {
    let token: string = credSelector.creds.token;

    let postBody = {
      title: title,
      question: question,
      answer: answer,
      tags: tags,
      token: token,
    };
    if (title.length === 0) {
      alert("Title cannot be empty");
    } else if (question.length === 0) {
      alert("Question cannot be empty");
    } else if (answer.length === 0) {
      alert("Answer cannot be empty");
    } else if (tags.length === 0) {
      alert("At least one tag required");
    } else {
      fetch(API_URL + "/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token":token
        },
        body: JSON.stringify(postBody),
      })
        .then((resp) => resp.text())
        .then((data) => {
          if (data === "success") {
            setAnswer("");
            setTags([]);
            setQuestion("");
            setTitle("");
            alert("Post created");
          } else {
            alert("Error! Failed to create post");
          }
        }).catch(err=>alert("Failed to create post"));
    }
  }
  function Tag(props: { name: string }) {
    return (
      <span className="bg-[#e2e8f0] w-fit p-2 mb-1 text-[blue] text-sm">
        {props.name}
        <span
          onClick={() => {
            setTags(tags.filter((e) => e != props.name));
          }}
          className="p-1.5 rounded ml-1.5 bg-[#fafafa] text-[#1c1917]"
          style={{ borderRadius: "100%", width: "5px", height: "5px" }}
        >
          x
        </span>
      </span>
    );
  }
  function AddedTagBox() {
    return (
      <div className="grid grid-cols-2">
        {tags.map((e) => (
          <Tag key={Math.random()} name={e}></Tag>
        ))}
      </div>
    );
  }
  return (
    <div style={newPostContainer}>
      <Container>
        <div className="w-fit p-0">
          <Typography variant="h5" className="mb-2 text-[#2587E4]">
            Add Post
          </Typography>
          <TextField
            required={true}
            label="Title"
            placeholder="Title (Max 25 characters)"
            onChange={(e) => {
              setTitle(String(e.target.value).substring(0,25));
            }}
            value={title}
          />
          <div className="mt-2 mb-2">
            <TextField
              placeholder="Maximum 15 characters"
              label="Tag"
              value={currentTag}
              onChange={(e) => {
                setCurrentTag(e.target.value.substring(0, 15));
              }}
            />
            <button
              onClick={() => {
                if(tags.length>=10){
                  alert("Maximum 10 tags allowed");
                }
                else{
                  setTags([...tags, currentTag]);
                  setCurrentTag("");
                }
              }}
              className="text-3xl bg-[#2587E4] text-[white] rounded-full px-2 pb-1 ml-3 mt-2"
            >
              +
            </button>
          </div>
          <AddedTagBox />
          <div className="mb-2 mt-2">
            <TextField
              required={true}
              onChange={(e) => {
                setQuestion(String(e.target.value).substring(0,1000));
              }}
              value={question}
              label="Question"
              placeholder="Question(max 1000 characters)"
              multiline={true}
              minRows={1}
              style={{ width: "82%",maxHeight:"20vh",overflow:"auto" }}
            />
          </div>
          <div className="mb-2 mt-3">
            <TextField
              required={true}
              onChange={(e) => {
                setAnswer(String(e.target.value).substring(0,1000));
              }}
              value={answer}
              label="Answer"
              placeholder="Answer(max 1000 characters)"
              multiline={true}
              minRows={1}
              style={{ width: "82%",maxHeight:"20vh",overflow:"auto" }}
            />
          </div>
          <Button
            variant="contained"
            style={{ marginTop: "5px" }}
            onClick={SubmitPost}
          >
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
}
