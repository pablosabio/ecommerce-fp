import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // initialize user from local storage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [ loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // save user to localstorage whenever it changes
    useEffect (() => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const register = async (name, email,   // eslint-disable-next-line no-unused-vars
        password) => {
        setLoading(true);
        setError(null);
        
        // mock register function
        try {
            //simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // in real app this is API call to register
            // for now just create mock user
            const newUser = {
                id: 'user_' + Date.now(),
                name,
                email,

                // do not store actual password in localstorage for security
                // in real app password would be hashed on the server
                createdAt: new Date().toISOString()
            };
            
            setUser(newUser);
            return newUser;
        } catch (err) {
            setError('Registration failed. Please try again.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            await new Promise (resolve => setTimeout(resolve, 1000));

            // same as before
            if (!email.includes('@') || !password) {
                throw new Error ('Invalid credentials');
            }

            // create a mock user
            const loggedInUser = {
                id: 'user_' + Date.now(),
                name: email.split('@')[0], // extract name from email
                email,
                createdAt: new Date().toISOString()
            };
            setUser(loggedInUser);
            return loggedInUser;
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            error,
            register,
            login,
            logout,
            isAuthenticated: !!user
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};