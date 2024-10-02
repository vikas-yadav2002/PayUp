"use client";
import SideBar from "../../components/sideBar";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SkeletonLoader from "../../components/transferSkeleton";
import HomeLoader from "../../components/HomeLoader";
import TransactionsLoader from "../../components/TransactionsLoader";
import PeerToPeerLoader from "../../components/PeerToPeerLoader";

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
     
        setLoading(false);
    
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

  const renderLoader = () =>{
      switch(pathname){
        case '/transfer':
        return <SkeletonLoader />;
      case '/dashboard':
        return <HomeLoader />;
      case '/transactions':
        return <TransactionsLoader />;
      case '/peer-to-peer':
        return <PeerToPeerLoader />;
      default:
        return <Loader/>;
      }
  }

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <SideBar/>

      {/* Main Content Area */}
      {loading ? renderLoader() : children}
      
    </div>
  );
}
