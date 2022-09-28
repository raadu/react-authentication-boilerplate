import React, { useState, useContext } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { AuthContext, RouteContext } from "context";
import { UserHeaderCard } from "components";
import "./LayoutComponent.scss";

// Antd Constants
const { Header, Sider, Content } = Layout;

const LayoutComponent = ({ children }) => {
    // States
    const [collapsed, setCollapsed] = useState(false);

    // Contexts
    const { menuItems } = useContext(AuthContext);
    const { goToRoute } = useContext(RouteContext);

    const clickOnMenu = (e) => {
        // Change routes based on `to` property of menu item
        if(e?.item?.props?.to) {
            goToRoute(e.item.props.to);
        }
        else {
            goToRoute('/');
        }
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logoContainer">
                    <div className="logo" onClick={() => goToRoute('/')}>
                        <img src="/assets/icons/ssl_logo.png" alt="SSL" />
                    </div>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={menuItems}
                    onClick={clickOnMenu}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="userHeader"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                    <UserHeaderCard 
                        username="Test User"
                        positionName="CTO"
                        imagePosition="right"
                        imageLink="/assets/icons/user_image_1.png"
                    />
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;
