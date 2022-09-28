import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const RouteContext = createContext({});

const RouteContextProvider = ({ children }) => {
    // Router
    const navigate = useNavigate();

    const goToRoute = (routeName) => {
        navigate(routeName);
    }

    return (
        <RouteContext.Provider value={{ goToRoute }}>
            {children}
        </RouteContext.Provider>
    );
};

export default RouteContextProvider;
