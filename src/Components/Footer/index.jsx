// Footer.jsx
export function Footer({ onDeleteAll, onDeleteAllCompleted }) {
    
    return (
        <footer>
            <button onClick={onDeleteAll}>Delete All</button>
            <button onClick={onDeleteAllCompleted}>Delete All Completed</button>
        </footer>
    );
}