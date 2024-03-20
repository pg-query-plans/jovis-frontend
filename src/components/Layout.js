import Header from "./Header";
import Dp from "./dp/Dp";
import Geqo from "./geqo/Geqo";
import React, { useState } from "react";
import "../App.css";

function Layout() {
  const [useGeqo, setUseGeqo] = useState(false);

  return (
    <div>
      <Header />
      <div className="main-container">
        useGeqo ? <Geqo/> : <Dp/>
      </div>
    </div>
  );
}

export default Layout;
