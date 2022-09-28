import { LayoutComponent } from "components";

const LayoutWrapper = (props) => {
    // Props
    const { component } = props;

    return (
        <LayoutComponent>
            {component}
        </LayoutComponent>
    );
};

export default LayoutWrapper;
