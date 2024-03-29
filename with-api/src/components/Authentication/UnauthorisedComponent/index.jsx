import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import './UnauthorisedComponent.scss';

const UnauthorisedComponent = () => {
    // Router
    const navigate = useNavigate();

    const goToRoute = () => {
        navigate("/login");
    };

    return (
        <div className="unauthorise-component-container">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary" onClick={goToRoute}>
                        LOGIN
                    </Button>
                }
            />
        </div>
    );
};

export default UnauthorisedComponent;
