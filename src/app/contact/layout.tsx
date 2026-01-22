import React from 'react';

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <h1>This is contact layout!</h1>
            {children}
        </div>
    );
};

export default ContactLayout;