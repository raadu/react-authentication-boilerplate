import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadingComponent = (props) => {
    // Props
    const { spinnerSize, justifyCenter, fullPageLoader } = props;

    // Styles
    const justifyCenterStyle = {
        display: "flex",
        justifyContent: "center",
    };

    const fullPageLoaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    const styleObject = {
        ...(justifyCenter? justifyCenterStyle : {} ),
        ...(fullPageLoader? fullPageLoaderStyle : {} ),
    };

    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: spinnerSize || 24,
          }}
          spin
        />
    );

    return (
        <div style={styleObject}>
            <Spin indicator={antIcon} />
        </div>
    );
}

export default LoadingComponent;