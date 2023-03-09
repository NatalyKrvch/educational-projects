import React from "react";
import { createRoot } from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import Counter from "./components/counter";

const App = () => {
    return <Counter />;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);