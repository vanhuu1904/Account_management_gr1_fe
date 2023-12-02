import React, { useEffect, useState } from "react";
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './LayoutAdmin.scss'
import { useDispatch, useSelector } from "react-redux";
import { getAUser, logout } from "../../services/api";
import { doLogoutAction } from "../../redux/account/accountSlice";
import ManageAccount from "./ManageAccount";

const { Content, Footer, Sider } = Layout;

const items: any = [
    {
        label: <Link to="/admin">Dashboard</Link>,
        key: "dashboard",
        icon: <AppstoreOutlined />,
    },
    {
        label: <span>Manage Users</span>,
        // key: 'user',
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to="/admin/user">CRUD</Link>,
                key: "crud",
                icon: <TeamOutlined />,
            },
            {
                label: "Files1",
                key: "file1",
                icon: <TeamOutlined />,
            },
        ],
    },
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState("dashboard");

    // Manage Account
    const [openModalAccount, setOpenModalAccount] = useState(false);
    const [dataUser, setDataUser] = useState();

    useEffect(() => {
        getDataUser();

    }, [])

    const getDataUser = async () => {
        const res = await getAUser(user._id);
        if (res && res.data) {
            setDataUser(res.data);
        }
        console.log(">>>>check res: ", res);
    }

    const user = useSelector((state: any) => state.account.user);
    console.log(">>>check user: ", user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await logout();
        console.log(">>>check res: ", res);
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success("Đăng xuất thành công");
            navigate("/login");
        }
    };

    const itemsDropdown = [
        {
            label: <label style={{ cursor: "pointer" }} onClick={() => setOpenModalAccount(true)} >Quản lý tài khoản</label>,
            key: "account",
        },
        {
            label: (
                <label style={{ cursor: "pointer" }}
                    onClick={() => handleLogout()}
                >
                    Đăng xuất
                </label>
            ),
            key: "logout",
        },
    ];

    return (
        <>
            <Layout style={{ minHeight: "100vh" }} className="layout-admin">
                <Sider
                    theme="light"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div style={{ height: 32, margin: 16, textAlign: "center" }}>Admin</div>
                    <Menu
                        defaultSelectedKeys={[activeMenu]}
                        mode="inline"
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    />
                </Sider>
                <Layout>
                    <div className="admin-header">
                        <span>
                            {React.createElement(
                                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                                {
                                    className: "trigger",
                                    onClick: () => setCollapsed(!collapsed),
                                }
                            )}
                        </span>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Welcome {user?.fullname}
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <ManageAccount
                openModalAccount={openModalAccount}
                setOpenModalAccount={setOpenModalAccount}
                dataUser={dataUser}
            />
        </>
    );
};

export default LayoutAdmin;
