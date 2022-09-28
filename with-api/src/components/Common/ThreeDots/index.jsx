import { Dropdown } from "antd";
import {
    MoreOutlined,
} from "@ant-design/icons";
import './ThreeDots.scss';

const ThreeDots = (props) => {
    // Props
    const { menu } = props;

    return (
        <Dropdown overlay={menu} className="three-dots-container">
            <MoreOutlined style={{ fontSize: "24px" }} />
        </Dropdown>
    );
}

export default ThreeDots;