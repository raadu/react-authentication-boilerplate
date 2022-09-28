import React, { useContext } from "react";
import { Button, Result } from "antd";
import { RouteContext } from "context";
import './ErrorPage.scss';

const ErrorPage = () => {
    // Contexts
    const { goToRoute } = useContext(RouteContext);

    const HomeButton = () => {
        return(
            <Button type="primary" onClick={() => goToRoute("/")}>Back Home</Button>
        );
    }

    return (
        <div className="errorPageContainer">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<HomeButton />}
            />
        </div>
    );
};

export default ErrorPage;
