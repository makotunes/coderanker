import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/auth.server";

export const config = {
  runtime: 'edge'
};

export async function loader({ request }: ActionFunctionArgs) {
  return authenticator.logout(request, { redirectTo: "/login" });
} 