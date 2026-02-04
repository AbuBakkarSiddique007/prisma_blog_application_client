import { redirect } from "next/navigation";

const UserDashboard = () => {
    return redirect("/dashboard/create-blog");
};

export default UserDashboard;