import { setTimeout as delay } from "timers/promises";

const AboutPage = async() => {

    await delay(4000)

    throw new Error("Something went wrong!!!")

    return (
        <div>
            <h1>This is a about page.</h1>
        </div>
    );
};

export default AboutPage;