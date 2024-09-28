export const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',  
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true, 
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};