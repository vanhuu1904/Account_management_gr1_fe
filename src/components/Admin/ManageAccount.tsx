import { useState } from 'react';
import { Button, Col, InputNumber, Modal, Row, Select, Tabs, message, notification } from 'antd';
import { Checkbox, Form, Input } from 'antd';
import { createANewUser } from '../../services/api';
import InfoAccount from './InfoAccount';
import ChangePassword from './ChangePassword';


interface IUser {
    username: string;
    password: string;
    fullname: string;
    studentcode: number;
    address: string;
}

const ManageAccount = (props: any) => {
    const { openModalAccount, setOpenModalAccount, dataUser } = props;
    const [isSubmit, setIsSubmit] = useState(false)

    const [form] = Form.useForm();

    const onFinish = async (values: IUser) => {
        const { username, password, fullname, studentcode, address } = values;
        setIsSubmit(true);
        const res: any = await createANewUser(username, password, fullname, studentcode, address);
        setIsSubmit(false);
        console.log(">>>check res: ", res);
        if (res && res.data) {
            message.success('Tạo mới user thành công');
            form.resetFields();
            setOpenModalAccount(false);
            await props.fetchUser();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
    }
    const items = [
        {
            key: '1',
            label: 'Thông tin user',
            children: <InfoAccount dataUser={dataUser} />,
        },
        {
            key: '2',
            label: 'Đổi mật khẩu',
            children: <ChangePassword dataUser={dataUser} />,
        }
    ];
    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Modal
            title="Quản lý tài khoản"
            open={openModalAccount}
            onCancel={() => setOpenModalAccount(false)}
            cancelText={"Đóng"}
            onOk={() => setOpenModalAccount(false)}
            confirmLoading={isSubmit}
            width={800}
        >
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
            />
        </Modal >
    )
}

export default ManageAccount;