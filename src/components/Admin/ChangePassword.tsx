import { Button, Col, Form, Input, InputNumber, Row, message, notification } from "antd";
import { useEffect } from 'react'
import { changePassword } from "../../services/api";
const ChangePassword = (props: any) => {
    const { dataUser } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(dataUser);
    }, [])
    const onFinish = async (values: any) => {
        const { currentpassword, newpassword } = values;
        const res: any = await changePassword(currentpassword, newpassword);
        console.log(">>>check res: ", res);
        if (res && res.data) {
            message.success('Đổi mật khẩu thành công');
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
    }
    return (
        <Form
            form={form}
            name="basic"
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Id"
                labelCol={{ span: 24 }}
                name="_id"
                hidden
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mật khẩu hiện tại"
                labelCol={{ span: 24 }}
                name="currentpassword"
            >
                <Input.Password style={{ width: '70%' }} />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                labelCol={{ span: 24 }}
                name="newpassword"
            >
                <Input.Password style={{ width: '70%' }} />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => { form.submit() }}>Đổi mật khẩu</Button>
            </Form.Item>
        </Form>
    )
}
export default ChangePassword;