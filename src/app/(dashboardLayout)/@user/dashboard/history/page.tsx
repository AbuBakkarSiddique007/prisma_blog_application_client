import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service";

const HistoryPage = async () => {
    const res = await blogService.getAllBlogs()

    const posts = res?.data || [];

    console.log("Posts : ", posts);

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Blog Post History Page
            </h1>

            <HistoryTable posts={posts} />

        </div>
    );
};

export default HistoryPage;