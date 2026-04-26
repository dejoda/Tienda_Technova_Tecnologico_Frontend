import { Outlet } from "react-router";
import { useAuth } from "../context/authcontext";
import Sidebar from "./components/Sidebar";
import "./style/Dashboardlayout.css";
import Header from "../layout/header";
import Footer from "../layout/footer";

const DashboardLayout = () => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="dashboard-loading">
                <span className="dashboard-loading__spinner" />
            </div>
        );
    }

    return (
        <div className="dashboard-shell">
            <Header />
            <div className="dashboard-layout">
                <Sidebar />
                <div className="dashboard-layout__main">
                    {/* DashboardHeader va aquí cuando lo creemos */}
                    <main className="dashboard-layout__content">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;