import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button, notification } from "antd";
import { AuthContext } from "context";
import { postData, getData } from "utils/api-service";
import { LOGIN } from "utils/endpoints";
import "./Login.scss";
import { DUMMMY_API_RESPONSE } from "utils/dummyData";

const Login = () => {
    // Antd Constants
    const { Item } = Form;

    // Contexts
    const { setAuth, setInitialLogin } = useContext(AuthContext);

    //  Others
    const emailRef = useRef();
    const navigate = useNavigate();

    const onFinishFailed = (errorInfo) => {
        notification.error({
            message: "Error User Login",
            placement: "topLeft",
        });
    };

    const LoginUser = async (values) => {
        const query = LOGIN;
        const bodyObject = {
            email: values?.email,
            password: values?.password,
        };

        // Uncomment below lines and use with real backend API
        // const response = await postData(query, bodyObject);


        // if (response && response.code === 201) {
        //     const accessToken = response?.access_token;
        //     const user = response?.userDetails;
        //     const roles = response?.userDetails?.roles;

        //     setAuth({ user, roles, accessToken });
        //     setInitialLogin(true);

        //     notification.success({
        //         message: `User Logged In Successfully`,
        //         placement: "topLeft",
        //     });

        //     navigate("/");
        // } else {
        //     notification.error({
        //         message: `${
        //             response?.messages
        //                 ? response?.messages[0]
        //                 : "Error User Login"
        //         }`,
        //         placement: "topLeft",
        //     });
        //     emailRef.current.focus();
        // }

        // Bypass login for test purpose without API
        const accessToken = DUMMMY_API_RESPONSE?.access_token;
        const user = DUMMMY_API_RESPONSE?.userDetails;
        const roles = DUMMMY_API_RESPONSE?.userDetails?.roles;

        setAuth({ user, roles, accessToken });
        setInitialLogin(true);

        notification.success({
            message: `User Logged In Successfully`,
            placement: "topLeft",
        });

        navigate("/");

    };

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="illustration-wrapper">
                    <img
                        src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
                        alt="Login"
                    />
                </div>
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={LoginUser}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title">React Authentication</p>
                    <p>Login to the Dashboard</p>
                    <Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter Email",
                            },
                            {
                                pattern: new RegExp(
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                ),
                                message: "Not a valid email address",
                            },
                        ]}
                    >
                        <Input placeholder="Email" ref={emailRef} />
                    </Item>

                    <Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Item>

                    <Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Item>

                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            LOGIN
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
