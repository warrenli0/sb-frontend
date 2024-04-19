import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

declare global {
    interface Window {
        handleCredentialResponse?: (response: any) => void;
    }
}

declare const google: any; // Declare google for TypeScript

const LoginComponent: React.FC = () => {
    const signInButtonRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    useEffect(() => {
        window.handleCredentialResponse = (response) => {
            handleCredentialResponse(response);
        };

        google.accounts.id.initialize({
            client_id: '876438943950-afesndmlt4lkd6gkgqflfq7h03ur6o6b.apps.googleusercontent.com', // Your Google client ID
            callback: window.handleCredentialResponse,
        });

        if (signInButtonRef.current) {
            google.accounts.id.renderButton(
                signInButtonRef.current,
                { theme: 'outline', size: 'large' }
            );
        }

        google.accounts.id.prompt(); // Trigger the Sign-In prompt
    }, []);

    const handleCredentialResponse = async (response: any) => {
        const id_token = response.credential;
        try {
            const res = await fetch('http://localhost:5000/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: id_token }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const user = await res.json();
            console.log(user);
            setCurrentUser(user);

            navigate('/');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <p>login works!</p>
            <div ref={signInButtonRef} className="g_id_signin"></div>
        </div>
    );
};

export default LoginComponent;
