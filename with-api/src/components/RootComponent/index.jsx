import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider, RouteContextProvider } from "context";
import {
    LayoutWrapper,
    ErrorPage,
    DashboardComponent,
    MenuOneComponent,
    MenuTwoComponent,
    Login,
    RequireAuth,
} from "components";
import "styles/index.scss";

function RootComponent() {

    const routesArray = [
        {
            id: 1,
            name: "dashboard",
            path: "/",
            component: <DashboardComponent />,
            allowedPermissions: ["dashboard-show"],
        },
        {
            id: 6,
            name: "menu-one",
            path: "/menu-one",
            component: <MenuOneComponent />,
            allowedPermissions: ["menu-one-show"],
        },
        {
            id: 7,
            name: "menu-two",
            path: "/menu-two",
            component: <MenuTwoComponent />,
            allowedPermissions: ["menu-two-show"],
        },
    ];

    return (
        <div className="App">
            <AuthContextProvider>
                <BrowserRouter>
                    <RouteContextProvider>
                        <Routes>
                            {/* Public Routes: does not required authentication */}
                            <Route path="/login" exact element={<Login />} />
                            <Route path="*" element={<ErrorPage />} />
                            {/* Routes that required authentication */}
                            {routesArray?.map((routeItem, index) => {
                                return (
                                    <Route
                                        element={
                                            <RequireAuth
                                                allowedPermissions={
                                                    routeItem?.allowedPermissions
                                                }
                                            />
                                        }
                                        key={routeItem?.id}
                                    >
                                        <Route
                                            path={routeItem?.path}
                                            element={
                                                <LayoutWrapper
                                                    component={
                                                        routeItem?.component
                                                    }
                                                />
                                            }
                                        />
                                    </Route>
                                );
                            })}
                        </Routes>
                    </RouteContextProvider>
                </BrowserRouter>
            </AuthContextProvider>
        </div>
    );
}

export default RootComponent;
