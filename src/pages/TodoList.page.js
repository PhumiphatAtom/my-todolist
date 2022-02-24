import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import CardTodoList from "../components/CardTodoList";

export default function TodoList() {
  const [Description, setDescription] = useState("");
  const [card, setCard] = useState({
    unsuccessful: {
      data: [],
      targetName: "done",
    },
    done: {
      data: [],
      targetName: "",
    },
  });

  function handleSubmit() {
    if (Description !== "") {
      const tempData = {
        ...card,
        unsuccessful: {
          ...card.unsuccessful,
          data: [...card.unsuccessful.data, Description],
        },
      };
      setCard(tempData);
      setDescription("");
      localStorage.setItem("cardTodo", JSON.stringify(tempData));
    } else {
      alert("กรุณากรอกข้อมูล");
    }
  }

  function handleSuccess(source, targetName) {
    let tempCard = { ...card };
    let dataArrSource = tempCard[source.name].data;
    console.log(tempCard[source.name].data);
    let dataArrTarget = tempCard[targetName].data;
    tempCard[targetName].data = [...dataArrTarget, dataArrSource[source.index]];
    tempCard[source.name].data = dataArrSource.filter((item, index) => {
      return index !== source.index;
    });
    setCard(tempCard);
    localStorage.setItem("cardTodo", JSON.stringify(tempCard));
  }

  function handleDel({ name, index }) {
    let tempCard = { ...card };
    let arrItem = tempCard[name].data;

    tempCard[name].data = arrItem.filter((item, index2) => {
      return index !== index2;
    });
    setCard(tempCard);
    localStorage.setItem("cardTodo", JSON.stringify(tempCard));
  }

  const handleSubmitEdit = (data) => {
    let tempCard = { ...card };
    let dataArr = tempCard[data.name].data;
    dataArr[data.index] = data.newValue;
    setCard(tempCard);
    localStorage.setItem("cardTodo", JSON.stringify(tempCard));
  };

  useEffect(() => {
    const tempLocalStorage = localStorage.getItem("cardTodo");
    if (tempLocalStorage !== null) {
      const obj = JSON.parse(tempLocalStorage); // object to string
      setCard(obj);
    }

    // console.log(obj);
  }, []);

  return (
    <div style={{ maxWidth: "72rem", marginLeft: "auto", marginRight: "auto" }}>
      <div
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "start",
          paddingTop: 20,
          paddingBottom: 15,
        }}
      >
        TODO LIST WITH REACT
      </div>
      <div>
        <Form style={{ width: "20rem" }}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            placeholder="Description"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={Description}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              onChange={(e) => {
                setDescription(e.target.value);
                // console.log(Description);
              }}
            />
          </Form.Group>
        </Form>
        <Button
          className="mb-3"
          variant="primary"
          onClick={() => {
            handleSubmit();
            // console.log(Description);
          }}
        >
          Add task
        </Button>
      </div>
      <div
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "start",
          paddingTop: 20,
          paddingBottom: 15,
        }}
      >
        Today
      </div>
      <div style={{ display: "flex", alignItems: "start" }}>
        {Object.entries(card).map(([key, value], index) => (
          <CardTodoList
            name={key}
            data={value.data}
            targetName={value.targetName}
            onDone={handleSuccess}
            onDelete={handleDel}
            onSubmitEdit={handleSubmitEdit}
            key={value.data + index}
          />
        ))}
      </div>
    </div>
  );
}
