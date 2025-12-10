"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReportingsPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/reportings/skills");
    }, [router]);

    return null;
}
