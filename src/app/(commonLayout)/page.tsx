import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";
// import { cookies } from "next/headers";
// import { authClient } from "@/lib/auth-client";

export default async function Home() {

  // const session =  authClient.getSession()
  // console.log("Session : ", session);

  // const cookieStore = await cookies()
  // console.log(cookieStore);

  // const res = await fetch("http://localhost:5000/api/auth/get-session" , {
  //   headers : {
  //     cookie : cookieStore.toString()
  //   },
  //   cache : "no-store"
  // })

  // const SessionData = await res.json()
  // console.log("Session Data : ", SessionData);


  const {data} = await userService.getSession()
  console.log("Session Data from Service : ", data);

  return (
    <div>
      <Button variant={"outline"}>Click Here</Button>
    </div>
  );
}
