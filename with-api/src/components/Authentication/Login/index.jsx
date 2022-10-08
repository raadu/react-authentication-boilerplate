import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Button, notification } from "antd";
import { AuthContext } from "context";
import { getData, postData } from "utils/api-service";
import { LOGIN } from "utils/api";
import "./Login.scss";

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
        const query = LOGIN();
        const customQuery = `${query}?email=${values.email}&password=${values.password}`;
        const bodyObject = {
            email: values?.email,
            password: values?.password,
        };
        const response = await getData(customQuery);
        if (response) {
            console.log('response: ', response);
            return;
            
            const user = response?.data?.userDetails;
            const roles = response?.data?.userDetails?.roles;
            const accessToken = response?.data?.access_token;

            setAuth({ user, roles, accessToken });
            setInitialLogin(true);

            notification.success({
                message: `User Logged In Successfully`,
                placement: "topLeft",
            });

            navigate("/");
        } else {
            notification.error({
                message: `${
                    response?.messages
                        ? response?.messages[0]
                        : "Error User Login"
                }`,
                placement: "topLeft",
            });
            emailRef.current.focus();
        }
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
