"use client"

import { useEffect } from "react";

const ErrorPage = (
    { error, reset }: {
        error: Error & { digest?: string };
        reset: () => void
    }) => {


    useEffect(() => {

        // we can pass this error to a logger.
        console.error(error)

    }, [])

    return (
        <div>
            <h1>
                Something went wrong : Try again
            </h1>
            <button onClick={() => reset()}>Retry</button>
        </div>
    );
};

export default ErrorPage;