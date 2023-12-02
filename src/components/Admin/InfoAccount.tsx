import { Col, Descriptions, Form, Input, InputNumber, Row } from "antd"
import moment from "moment";
import { useEffect } from "react";

const InfoAccount = (props: any) => {
    const { dataUser } = props;
    return (
        <>
            <Descriptions
                title="Thông tin User"
                bordered
                column={2}
            >
                <Descriptions.Item label="Id">{dataUser?._id}</Descriptions.Item>
                <Descriptions.Item label="Username">{dataUser?.username}</Descriptions.Item>
                <Descriptions.Item label="Họ và tên">{dataUser?.fullname}</Descriptions.Item>
                <Descriptions.Item label="Mã số sinh viên">{dataUser?.studentcode}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ" span={2}>
                    {dataUser?.address}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {moment(dataUser?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {moment(dataUser?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                </Descriptions.Item>
            </Descriptions>;
        </>
    )
}
export default InfoAccount;