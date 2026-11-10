import { redirect } from "next/navigation";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { isAdmin } from "./data";

export async function requireAdmin(returnTo = "/admin") {
  const user = await requireChatGPTUser(returnTo);
  if (!(await isAdmin(user.userId))) redirect("/admin/setup");
  return user;
}
