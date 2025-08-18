export const handleApiError = (error) => {
    console.error('API ERROR: ', error);

    // Handle connection errors
    if (error.message.includes('Unable to connect to server')) {
        return 'Cannot connect to server. Please make sure the backend is running.';
    }
    
    if (error.message.includes('401')) {
        return 'Please login again';
    }
    if (error.message.includes('404')) {
        return 'Data not found';
    }
    if (error.message.includes('500')) {
        return 'Server error - try again later';
    }
    
    return 'Something went wrong. Please try again.';
};