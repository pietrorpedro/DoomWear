import AppRouter from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
    return (
        <>
            <LoadingProvider>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </LoadingProvider>
        </>
    )
}

export default App
