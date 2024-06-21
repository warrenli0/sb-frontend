import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

declare global {
    interface Window {
        google: any;
        handleCredentialResponse?: (response: any) => void;
    }
}

declare const google: any; // Declare google for TypeScript

const TempLoginComponent: React.FC = () => {
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
            const res = await fetch('https://sbapidev.com/auth/google', {
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

            navigate('/current-home');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#E9F5FF]">
          <div className="bg-white p-8 rounded-lg drop-shadow-[0_4px_0px_rgba(140,147,153,.3)] text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-2">Login to SB</h2>
            <hr className="mb-4 border-t-2 border-gray-300" />
            <div ref={signInButtonRef} className="g_id_signin flex justify-center mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}></div>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account? Sign in with Google above!
            </p>
          </div>
        </div>
      );
};

export default TempLoginComponent;


        {/*
        <div>
            <p>login works!</p>
            <div ref={signInButtonRef} className="g_id_signin"></div>
        </div>*/}