"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConfigurationsPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/configurations/work_locations");
    }, [router]);

    return null;
}
