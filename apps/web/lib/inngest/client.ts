import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "dev-oc",
  isDev: process.env.NODE_ENV !== "production",
  name: "Dev'Oc",
});
