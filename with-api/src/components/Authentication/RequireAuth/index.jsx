import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "context";
import { UnauthorisedComponent, LoadingComponent } from 'components';

const RequireAuth = (props) => {
    // Props
    const { allowedPermissions } = props;

    // Contexts
    const { auth, authLoading } = useContext(AuthContext);

    const hasPermission = () => {
        const hasAuthToken = auth && auth?.accessToken;
        const isSuperAdmin =
            auth &&
            auth?.roles?.find((roleItem) =>
                roleItem?.permissions?.find((permissionItem) =>
                    permissionItem?.name === "all-privilege"
                )
            );
        const hasRolePermission =
            auth &&
            auth?.roles?.find((roleItem) =>
                roleItem?.permissions?.find((permissionItem) =>
                    allowedPermissions.includes(permissionItem?.name)
                )
            );

        // If has all pages access
        if(hasAuthToken && isSuperAdmin) {
            return true;
        }

        // If has this page access
        if(hasAuthToken && hasRolePermission) {
            return true;
        }
        
        // Else no access
        return false;
    }

    if(authLoading) {
        return(
            <LoadingComponent
                spinnerSize={55}
                fullPageLoader
            />
        );
    }

    return (
        hasPermission() ? <Outlet/> : <UnauthorisedComponent />
    );
}

export default RequireAuth;