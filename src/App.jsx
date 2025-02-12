import AppRouter from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoryProvider } from "./contexts/CategoryContext";

function App() {
    return (
        <>
            <AuthProvider>
                <CategoryProvider>
                    <AppRouter/>
                </CategoryProvider>
            </AuthProvider>
        </>
    )
}

export default App
