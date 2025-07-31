'use client'

import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import { useState } from "react";
import { AppBar } from "../../app/[lang]/(loggedIn)/_components/app-bar";

export function HeaderWrapper() {
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  useHeaderTitle(setHeaderTitle);

  return <AppBar title={headerTitle} />;
}
