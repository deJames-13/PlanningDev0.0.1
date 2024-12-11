const API = import.meta.env.VITE_API_URL;

export const initializeApp = async () => {
    try {
        const response = await fetch(`${API}/sanctum/csrf-cookie`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }

        // Log the cookies set by the server
        console.log('Cookies:', document.cookie);

    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};