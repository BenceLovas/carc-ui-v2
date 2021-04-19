import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Nickname = () => {
  const [nicknameError, setNicknameError] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameError(!(event.target.value.length > 0));
    setButtonDisabled(!(event.target.value.length > 0));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ nickname: data.get("nickname") }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
            console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            console.log(error)
        }
      );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "3em",
            fontWeight: 500,
          }}
        >
          My nickname is
        </div>
        <form
          onSubmit={onSubmit}
          autoComplete="off"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="Nickname"
            id="nickname"
            name="nickname"
            onChange={handleNicknameChange}
            error={nicknameError}
            style={{ margin: "2em 0" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ borderRadius: "3em" }}
            disabled={buttonDisabled}
          >
            CONTINUE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Nickname;
