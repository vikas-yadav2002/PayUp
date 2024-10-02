"use client";
import SideBar from "../../components/sideBar";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Track current path

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500); // Artificial delay to simulate loading
    };

    handleRouteChange(); // Trigger loader on initial load

    // Add a route change listener
    const routeChange = router.push;
    router.push = (url) => {
      setLoading(true); // Set loading when navigation starts
      routeChange(url); // Continue the normal routing process
    };

    return () => {
      router.push = routeChange; // Clean up the override on unmount
    };
  }, [pathname, router]);

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <SideBar />

      {/* Main Content Area */}
      <div className="content">
        {loading ? <Loader /> : children}
      </div>
    </div>
  );
}
