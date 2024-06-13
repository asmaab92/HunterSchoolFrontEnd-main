import React, { useEffect, useState } from "react";
import { Button, Fab, Table, TextField } from "@mui/material";
import { useLogin } from "../Login/LoginContext.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import TitleAdmin from "../Title/TitleAdmin.jsx";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import AddIcon from "@mui/icons-material/Add";

const EditQuestionere = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: {
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
    },
    answer: "",
    part: "",
    image: null,
  });
  const { logout } = useLogin();

  const handleBack = () => {
    navigate("/Admin");
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://localhost:7211/Questionnaire");
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      } else {
        console.error("Failed to fetch questions");
      }
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const handleDeleteClick = (question) => {
    setSelectedQuestion(question);
    setOpenConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedQuestion) {
      try {
        const response = await fetch(
          `https://localhost:7211/Questionnaire/${selectedQuestion.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setQuestions(
            questions.filter((question) => question.id !== selectedQuestion.id)
          );
        } else {
          console.error("Failed to delete question.");
        }
      } catch (error) {
        console.error("Failed to delete question.", error);
      }
      setOpenConfirmDeleteDialog(false);
      setSelectedQuestion(null);
    }
  };

  const handleAddQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("option")) {
      setNewQuestion((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          [name]: value,
        },
      }));
    } else {
      setNewQuestion((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7211/Questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        const createdQuestion = await response.json();
        setQuestions((prev) => [...prev, createdQuestion]);
        setShowAddForm(false);
        setNewQuestion({
          question: "",
          options: {
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
          },
          answer: "",
          part: "",
          image: "",
        });
      } else {
        const errorResponse = await response.text();
        console.error("Failed to add question:", errorResponse);
      }
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  };

  return (
    <>
      <div className="admin-container">
        <div className="background">
          <TitleAdmin />
          <div className="admin-box">
            <h2>Question List</h2>
            <div className="add-container">
              <h3>Add a question</h3>
              <Fab
               size="medium"
                color="primary"
                aria-label="add"
                onClick={() => setShowAddForm(true)}
              >
                <AddIcon />
              </Fab>
            </div>
           
            {showAddForm && (
              <div className="add-form">
                <h2>Add Question</h2>
                <form onSubmit={handleAddQuestionSubmit}>
                  <TextField
                    label="Question"
                    name="question"
                    value={newQuestion.question}
                    onChange={handleAddQuestionChange}
                    required
                  />
                  <TextField
                    label="Option A"
                    name="optionA"
                    value={newQuestion.options.optionA}
                    onChange={handleAddQuestionChange}
                    required
                  />
                  <TextField
                    label="Option B"
                    name="optionB"
                    value={newQuestion.options.optionB}
                    onChange={handleAddQuestionChange}
                    required
                  />
                  <TextField
                    label="Option C"
                    name="optionC"
                    value={newQuestion.options.optionC}
                    onChange={handleAddQuestionChange}
                    required
                  />
                  <TextField
                    label="Option D"
                    name="optionD"
                    value={newQuestion.options.optionD}
                    onChange={handleAddQuestionChange}
                    required
                  />
                  <TextField
                    label="Answer"
                    name="answer"
                    value={newQuestion.answer}
                    onChange={handleAddQuestionChange}
                    required
                  />
                  <TextField
                    label="Part"
                    name="part"
                    value={newQuestion.part}
                    onChange={handleAddQuestionChange}
                    required
                  />
                  <TextField
                    label="Image ID"
                    name="image"
                    type="number"
                    value={newQuestion.image || ""}
                    onChange={handleAddQuestionChange}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Add
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </div>
            )}
            <Table className="table">
              <thead>
                <tr>
                  <th className="Top-row">ID</th>
                  <th className="Top-row">Question</th>
                  <th className="Top-row">Answer</th>
                  <th className="Top-row">Part</th>
                  <th className="Top-row">Actions</th>
                </tr>
              </thead>
              <tbody className="thred">
                {questions.map((question) => (
                  <tr key={question.id}>
                    <td className="thred">{question.id}</td>
                    <td className="thred">{question.question}</td>
                    <td className="thred">{question.answer}</td>
                    <td className="thred">{question.part}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(question)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <br />
          <button className="bButton" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        handleClose={() => setOpenConfirmDeleteDialog(false)}
        handleConfirm={handleConfirmDelete}
        item={selectedQuestion}
        itemType="question"
      />
    </>
  );
};

export default EditQuestionere;
