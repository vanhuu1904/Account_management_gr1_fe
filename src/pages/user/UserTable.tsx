import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popover, Popconfirm, message, notification } from 'antd';
import InputSearch from './InputSearch';
import { deleteAUser, fetchListUser } from '../../services/api';
import { Button } from 'antd';
import { FaPlus } from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import {
    CloudUploadOutlined,
    ExportOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import UserViewDetail from './UserViewDetail';
import UserModelCreate from './UserModalCreate';
import UserModalUpdate from './UserModalUpdate';
import UserImport from './data/UserImport'
// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);

    // View Detail
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState();

    // Update
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();

    // import excel
    const [openModalImport, setOpenModalImport] = useState(false);
    useEffect(() => {
        fetchUsers();
    }, [current, pageSize, filter, sortQuery]);

    const fetchUsers = async () => {
        setIsLoading(true);
        let query: string = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await fetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    }
    const renderHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Table List User</span>
                <span style={{ display: "flex", gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                    // onClick={() => handleExportData()}
                    >
                        Export
                    </Button>
                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        onClick={() => setOpenModalImport(true)}
                    >
                        Import
                    </Button>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setOpenModalCreate(true)}
                    >
                        Thêm mới
                    </Button>
                    <Button
                        type="ghost"
                        onClick={() => {
                            setFilter("");
                            setSortQuery("");
                        }}
                    >
                        <IoReloadOutline />
                    </Button>
                </span>
            </div>
        );
    };
    const handleSearch = (query: string) => {
        setFilter(query);
    }

    const handleDeleteUser = async (_id: string) => {
        const res: any = await deleteAUser(_id);
        if (res && res.data) {
            message.success("Xóa user thành công");
            fetchUsers();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            })
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text: any, record: any, index: any) => {
                return (
                    <a onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }}>
                        {record._id}
                    </a>
                )
            }
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            sorter: true,
        },
        {
            title: 'Mã số sinh viên',
            dataIndex: 'studentcode',
            sorter: true
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: true
        },
        { title: 'Type', dataIndex: 'type' },
        {
            title: 'Action',
            render: (text: any, record: any, index: any) => {
                return (
                    <>
                        <Popconfirm
                            placement="topLeft"
                            title="Xác nhận xóa user"
                            onConfirm={() => handleDeleteUser(record._id)}
                            description="Bạn có chắc chắn muốn xóa user này?"
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span><MdDeleteOutline style={{ cursor: 'pointer' }} color='red' size={20} /></span>

                        </Popconfirm>
                        <BiEditAlt style={{ cursor: 'pointer', marginLeft: 20 }} color='#f57800' size={20}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
                    </>
                )
            }
        }
    ];

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(q);
        }
    };

    return (
        <>

            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch
                        handleSearch={handleSearch}
                        setFilter={setFilter}
                    />
                </Col>
                {/* <Col span={12}>
                    <h3 style={{ marginLeft: 10 }}>Table User</h3>
                </Col>
                <Col span={12} >
                    <Button
                        style={{ marginLeft: 200 }}
                        type='primary'
                        onClick={() => {
                            setOpenModalCreate(true);
                            console.log(">>>check onpenmodal: ", openModalCreate)
                        }}
                    >
                        <FaPlus
                            color='white'
                            style={{ marginRight: 5 }}
                        />Thêm mới</Button>
                    <Button type='ghost'
                        onClick={() => { setFilter(''); setSortQuery('') }}>
                        <IoReloadOutline />
                    </Button>

                </Col> */}
                <Col span={24}>
                    <Table
                        className='def'
                        title={renderHeader}
                        columns={columns}
                        loading={isLoading}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey='_id'
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                pageSizeOptions: [1, 2, 3, 5]
                            }
                        }
                    />
                </Col>
            </Row >
            <UserViewDetail
                setDataViewDetail={setDataViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                openViewDetail={openViewDetail}
            />
            <UserModelCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchUsers={fetchUsers}
            />
            <UserModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchUsers={fetchUsers}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <UserImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                fetchUsers={fetchUsers}
            />
        </>
    )
}


export default UserTable;