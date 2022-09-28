import { createContext, useEffect, useState } from "react";
import cookies from "js-cookie";
import {
  ProjectOutlined,
  RadarChartOutlined,
  UngroupOutlined,
} from "@ant-design/icons";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  // States
  const [auth, setAuth] = useState(null);
  const [initialLogin, setInitialLogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(
      !initialLogin && cookies.get("react_auth_user_data") ? true : false
  );


  useEffect(() => {
      if (initialLogin) {
          cookies.set("react_auth_user_data", JSON.stringify(auth), {
              expires: 14,
          });
          setInitialLogin(false);
          setAuthLoading(false);
      }
      if (!initialLogin && cookies.get("react_auth_user_data")) {
          const userData = JSON.parse(cookies.get("react_auth_user_data"));
          setAuth(userData || {});
          setAuthLoading(false);
      }
  }, [initialLogin]);

  const logout = () => {
      cookies.remove("react_auth_user_data");
      setAuth(null);
  };

  const menuItems = [
    {
      key: "1",
      icon: <UngroupOutlined />,
      label: "Dashboard",
      to: "/",
    },
    {
      key: "3",
      icon: <ProjectOutlined />,
      label: "Menu One",
      to: "/menu-one",
    },
    {
      key: "2",
      icon: <RadarChartOutlined />,
      label: "Menu Two",
      to: "/menu-two",
    },
  ];

  return (
      <AuthContext.Provider
          value={{
              menuItems,
              auth,
              setAuth,
              setInitialLogin,
              authLoading,
              logout,
          }}
      >
          {children}
      </AuthContext.Provider>
  );
};

export default AuthContextProvider;
