"use client";

import { useParams } from "next/navigation";

export function SiteInfo() {
  const { id } = useParams();
  return <h1>Page : {id}</h1>;
}
