import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../services/supabase";

const AuthContext = createContext();

const supabase = supabaseClient;

export function AuthProvider({children}) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        fetchUser();

        // listener da auth
        const {data: authListener} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user || null)
            }
        );

        return () => {
            authListener.subscription?.unsubscribe();
        };
    }, [])

    const signUp = async (email, password, fullName) => {
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {full_name: fullName}
            }
        });
    };

    const signIn = async (email, password) => {
        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) throw error;
    }

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                signUp,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}