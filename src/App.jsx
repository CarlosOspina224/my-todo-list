// App.jsx
// Components
import { TaskProvider } from "./Context";
import { Header } from "./Components/Header";
import { Main } from "./Components/Main";
import { Footer } from "./Components/Footer";

// Styles
import "./App.css";

/**
 * Renders the main App component with TaskProvider, Header, Main and Footer components.
 * @returns {JSX.Element} The App component with TaskProvider, Header, Main and Footer components.
 */

function App() {
    return (
        <TaskProvider>
            <Header />
            <Main />
            <Footer />
        </TaskProvider>
    );
}

export default App;
