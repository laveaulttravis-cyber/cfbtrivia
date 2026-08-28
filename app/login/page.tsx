import LoginForm from "./LoginForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string; error?: string };
}) {
  return <LoginForm next={searchParams.next || "/"} initialError={searchParams.error} />;
}
