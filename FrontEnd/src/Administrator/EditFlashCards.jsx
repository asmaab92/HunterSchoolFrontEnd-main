import React, { useEffect, useState } from "react";
import { Button, Fab, Table, TextField } from "@mui/material";
import TitleAdmin from "../Title/TitleAdmin.jsx";
import { useLogin } from "../Login/LoginContext.jsx";
import "./EditFlashCards.css";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import AddIcon from "@mui/icons-material/Add";

const EditFlashCards = () => {
  const navigate = useNavigate();
  const [flashCards, setFlashCards] = useState([]);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFlashCard, setNewFlashCard] = useState({
    question: "",
    answer: "",
    chapter: "",
  });

  const handleBack = () => {
    navigate("/Admin");
  };

  const { logout } = useLogin();

  useEffect(() => {
    fetchFlashCards();
  }, []);

  const fetchFlashCards = async () => {
    try {
      const response = await fetch("https://localhost:7211/FlashCards");
      if (response.ok) {
        const data = await response.json();
        setFlashCards(data);
      } else {
        console.error("Failed to fetch flashCards");
      }
    } catch (error) {
      console.error("Failed to fetch flashCards", error);
    }
  };

  const handleDeleteClick = (flashCard) => {
    setSelectedFlashCard(flashCard);
    setOpenConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedFlashCard) {
      try {
        const response = await fetch(
          `https://localhost:7211/FlashCards/${selectedFlashCard.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setFlashCards(
            flashCards.filter(
              (flashCard) => flashCard.id !== selectedFlashCard.id
            )
          );
        } else {
          console.error("Failed to delete flashCard.");
        }
      } catch (error) {
        console.error("Failed to delete flashCard.", error);
      }
      setOpenConfirmDeleteDialog(false);
      setSelectedFlashCard(null);
    }
  };
  const handleAddFlashCardChange = (e) => {
    const { name, value } = e.target;
    setNewFlashCard((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddFlashCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:7211/FlashCards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashCard),
      });
      if (response.ok) {
        const createdFlashCard = await response.json();
        setFlashCards((prev) => [...prev, createdFlashCard]);
        setShowAddForm(false);
        setNewFlashCard({ question: "", answer: "", chapter: "" });
      } else {
        console.error("Failed to add flashCard.");
      }
    } catch (error) {
      console.error("Failed to add flashCard.", error);
    }
  };
  return (
    <>
      <div className="admin-container">
        <div className="background">
          <TitleAdmin />

          <div className="admin-box">
            <h2>FlashCard List</h2>
            <div className="add-container">
              <h3>Add a card</h3>

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
                <h2>Add FlashCard</h2>
                <form onSubmit={handleAddFlashCardSubmit}>
                  <TextField
                    label="Question"
                    name="question"
                    value={newFlashCard.question}
                    onChange={handleAddFlashCardChange}
                    required
                  />
                  <TextField
                    label="Answer"
                    name="answer"
                    value={newFlashCard.answer}
                    onChange={handleAddFlashCardChange}
                    required
                  />
                  <TextField
                    label="Chapter"
                    name="chapter"
                    value={newFlashCard.chapter}
                    onChange={handleAddFlashCardChange}
                    required
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
                  <th className="Top-row">Chapter</th>
                  <th className="Top-row">Action</th>
                </tr>
              </thead>
              <tbody>
                {flashCards.map((flashCard) => (
                  <tr key={flashCard.id}>
                    <td className="thred">{flashCard.id}</td>
                    <td className="thred">{flashCard.question}</td>
                    <td className="thred">{flashCard.answer}</td>
                    <td className="thred">{flashCard.chapter}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(flashCard)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <button className="bButton" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>

      <ConfirmDeleteDialog
        open={openConfirmDeleteDialog}
        handleClose={() => setOpenConfirmDeleteDialog(false)}
        handleConfirm={handleConfirmDelete}
        item={selectedFlashCard}
        itemType="flashCard"
      />
    </>
  );
};

export default EditFlashCards;
