import React, { useEffect } from 'react'; // Tambahkan useEffect di sini
import { format } from 'date-fns';

function FormattedDate({ dateString }) {
    const date = new Date(dateString);
    const formattedDate = format(date, "yyyy, MMMM, dd HH:mm:ss");

    useEffect(() => {
    }, [formattedDate]);

    return (
        <span suppressHydrationWarning>{formattedDate}</span>
    );
}

export default FormattedDate;