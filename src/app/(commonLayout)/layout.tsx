import { Navbar } from "@/components/layout/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* Navbar */}
            <Navbar></Navbar>
            {
                children
            }
        </div>
    );
};

export default CommonLayout;