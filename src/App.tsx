import { Link } from "react-router-dom";
import { useState } from "react";

export default function App() {
  return (
    <>
      <Link to="/coin">Coin</Link>
      <Link to="/mine">Mine</Link>
    </>
  );
}
