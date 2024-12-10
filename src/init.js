const API = import.meta.env.VITE_API_URL;

export const initializeApp = async () => {
    try {
        const response = await fetch(`${API}/sanctum/csrf-cookie`, {
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};