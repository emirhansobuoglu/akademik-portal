"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function ClientRoleGuard({ allowedRoles, children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    // Eğer rol yoksa, giriş sayfasına yönlendir
    if (!role) {
      router.replace("/");
      return;
    }

    // Rol varsa ama yetkisizse → kendi sayfasına yönlendir
    if (!allowedRoles.includes(role)) {
      router.replace(`/${role}`);
      return;
    }

    // Eğer rol geçerliyse, children render edilir
  }, [allowedRoles, router]);

  return <>{children}</>;
}
