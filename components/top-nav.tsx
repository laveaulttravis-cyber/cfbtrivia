import Link from "next/link";
import { signOut } from "@/app/actions";

export function TopNav({ active }: { active?: "home" | "friends" }) {
  return (
    <div className="top-nav">
      {active !== "home" && <Link href="/">Home</Link>}
      {active !== "friends" && <Link href="/friends">Friends</Link>}
      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
