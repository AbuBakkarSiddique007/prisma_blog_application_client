import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default   function Home() {

  const session =  authClient.getSession()
  console.log("Session : ", session);

  
  return (
    <div>
      <Button variant={"outline"}>Click Here</Button>
    </div>
  );
}
