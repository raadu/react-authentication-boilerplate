import { useContext } from 'react';
import { Col, Row, Space, Menu } from "antd";
import "./UserHeaderCard.scss";
import { ThreeDots } from 'components';
import { AuthContext } from "context";
import { useNavigate } from 'react-router';

const UserHeaderCard = (props) => {
    // Props
    const { username, positionName, imageLink, imagePosition } = props;

    // Contexts
    const { logout } = useContext(AuthContext);

    // Router
    const navigate = useNavigate();

    const logoutUser = () => {
        logout();
        navigate("/login");
    }

    const menu = (
        <Menu
            items={[
                {
                    key: "1",
                    label: (
                        <div onClick={logoutUser}>
                            Logout
                        </div>
                    ),
                },
            ]}
        />
    );

    const UserImageUI = ({imageLink}) => {
        return (
            <div>
                <img
                    className="userImage"
                    src={imageLink}
                    alt="User"
                />
            </div>
        );
    };

    return (
        <Row>
            <Col span={24} className="userCardColumn">
                <div className="userCardContainer">
                    <Space>
                        {imagePosition === "left" ? (
                            <UserImageUI imageLink={imageLink} />
                        ) : null}
                        <div className="userDetailsContainer">
                            <div className="userName">{username}</div>
                            {positionName && (
                                <div className="positionName">
                                    {positionName}
                                </div>
                            )}
                        </div>
                        {imagePosition === "right" ? (
                            <UserImageUI imageLink={imageLink} />
                        ) : null}
                        <ThreeDots menu={menu}/>
                    </Space>
                </div>
            </Col>
        </Row>
    );
};

export default UserHeaderCard;
