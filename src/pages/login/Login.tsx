import React from "react";

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>WELCOME!</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 8,
          border: "1px solid #dfe1e5",
          boxSizing: "border-box",
          height: 42,
          borderRadius: 21,
        }}
      >
        <img src={`assets/logos/Google__G__Logo.svg`} height={24} />
        <div style={{ fontSize: 16, marginLeft: 20, paddingRight: 10 }}>
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
