import React from "react";
import reactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import Counter from "./components/counter";

const App = () => {
    return <Counter />;
}

reactDOM.render(<App />, document.getElementById('root'));