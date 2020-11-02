import * as React from 'react'
import {SearchOutlined, PlusCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Table, Tag, Space, Card, Button, Col, Row, Input, Select, Modal, Tooltip, Form, message} from 'antd';
import EndToEndTaskManageStore from '../../../../store/voice/EndToEndTaskManageStore'
import {Link, RouteComponentProps} from 'react-router-dom'
import ObjectUtils from "@/utils/ObjectUtils";
import {FormInstance} from "antd/lib/form";
import {invoke} from "@/store/IStore";

type Props = {} & RouteComponentProps<any>
type State = {}

class AppPage extends React.Component<Props, State> {
    state = {
        current: 3,
        page: {
            totalCount: 0,
            currentPage: 1,
            result: [],
            pageSize: 10
        },
        modalVisible: false,
        modalLineSelected: [],
        modalTemplateSelected: [],
        modalLineNumberSelected: [],
        tableLoading: false,
    };
    searchFormRef = React.createRef<FormInstance>();
    modalFormRef = React.createRef<FormInstance>();
    interval: number;
    columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            width: '6%'
        },
        {
            title: '任务名称',
            dataIndex: 'jobName',
            width: '15%'
        },
        {
            title: '任务描述',
            dataIndex: 'jobDescription',
            width: '15%',
            render: (text, record) => {
                return (record.jobDescription == undefined || record.jobDescription == "") ? "无" : record.jobDescription;
            }
        },
        {
            title: '机器人ID',
            dataIndex: 'botId',
            width: '5%'
        },
        {
            title: 'AI话术',
            dataIndex: 'templateName',
            width: '15%'
        },
        {
            title: '外呼线路',
            dataIndex: 'outboundLineName',
            width: '15%',
            render: (text, record) => {
                return (record.outboundLineName == undefined || record.outboundLineName == "") ? "无" : record.outboundLineName;
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTimeValue',
            width: '15%'
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" size="small">
                        <Link to={`/voice/ete/task/test/${record.id}/${record.jobName}`} className="divider-after">
                            测试
                        </Link>
                    </Button>|
                    <Button size="small">
                        <Link to={`/voice/ete/task/detail/${record.id}/${record.jobName}`} className="divider-after">
                            详情
                        </Link>
                    </Button>|
                    <Button size="small" onClick={() => {
                        this.showDeleteConfirm(record.id)
                    }}>
                        删除
                    </Button>
                </Space>
            )
        }
    ];

    // 表格数据变更函数
    handleTableChange = (page, options?: any) => {
        this.setState({tableLoading: true});
        this.getTableDataList(page, options)
    };

    // 获取表格数据
    getTableDataList(page, options?: any) {
        EndToEndTaskManageStore.list({...options, currentPage: page, pageSize: 8}, (result: any) => {
            console.log(result);
            if (result.status) {
                this.setState({
                    page: {
                        totalCount: result.data.totalCount,
                        currentPage: result.data.currentPage,
                        result: result.data.result,
                        pageSize: result.data.pageSize
                    },
                    tableLoading: false
                })
            } else {
                message.error(result.message);
            }
        })
    }

    // 获取查询条件信息
    getSearchComponentInfo = () => {
        return ObjectUtils.removeEmptyField(this.searchFormRef.current.getFieldsValue());
    };

    // 查询触发函数
    searchButtonOnClick = () => {
        var params = this.getSearchComponentInfo();
        console.log("请求参数打印：" + JSON.stringify(params));
        this.handleTableChange(1, params);
    };

    // 重置查询条件窗口
    onReset = () => {
        this.searchFormRef.current.resetFields();
    };

    deleteJobById = (close, id) => {
        console.log(close);
        EndToEndTaskManageStore.deleteJob({jobId: id}, (result: any) => {
            if (result.status) {
                this.searchButtonOnClick();
                message.success('删除成功');
            } else {
                message.error(result.message);
            }
            invoke(close);
        });
    };

    // 删除
    showDeleteConfirm = (id) => {
        Modal.confirm({
            title: '删除提示',
            icon: <ExclamationCircleOutlined/>,
            content: '您确认要删除吗？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: close => this.deleteJobById(close, id),
            onCancel() {
                console.log('取消');
            }
        });
    };


    // --------------------------------------------- 【初始化相关函数】 ----------------------------------------- [begin]
    // 初始化方法
    componentDidMount() {
        console.log('componentDidMount');
        this.handleTableChange(1);
        this.interval = window.setInterval(() => {
            const {page} = this.state;
        }, 10000)
    }

    // --------------------------------------------- 【弹窗相关函数】 ------------------------------------------- [begin]
    // 显示弹窗
    showModal = () => {
        // 设置弹窗可展示
        this.setState({
            modalVisible: true
        });
        if (this.modalFormRef.current != undefined) {
            this.modalFormRef.current.resetFields();
        }
    };

    // 弹窗关闭
    handleCancel = () => {
        this.modalFormRef.current.resetFields();
        // 弹窗设置不显示
        this.setState({
            modalVisible: false
        });
    };

    // 弹窗机器人ID控件聚焦移除改变
    modalBotIdInputChange = () => {
        let botId = this.modalFormRef.current.getFieldValue("botId");
        let env = this.modalFormRef.current.getFieldValue("env");
        console.log("modalBotIdInputChange -> botId :" + botId + ", env:" + env);
        // botId改变三个下拉列表清空
        this.setState({
            modalTemplateSelected: []
        });
        if (botId == undefined || botId == "" || env == undefined || env == "") {
            console.log("机器人ID不合法，无需获取三个下拉列表。");
            return;
        }
        // 获取并设置AI模版下拉列表
        EndToEndTaskManageStore.listAiTemplateSelected({botId: botId, env: env}, (result: any) => {
            console.log("listAiTemplateSelected: res :" + JSON.stringify(result));
            if (result.status) {
                this.setState({
                    modalTemplateSelected: result.data
                })
            } else {
                message.error(result.message);
            }
        });
        // 获取并设置线路下拉列表
        EndToEndTaskManageStore.listCallLineSelected({botId: botId, env: env}, (result: any) => {
            console.log("listCallLineSelected: res :" + JSON.stringify(result));
            if (result.status) {
                this.setState({
                    modalLineSelected: result.data
                })
            } else {
                message.error(result.message);
            }
        });
    };

    // 弹窗线路下拉列表改变，更新对应的线路号码
    modalLineSelectChange = () => {
        this.setState({
            modalLineNumberSelected: []
        });
        this.modalFormRef.current.resetFields(["outboundCallNumberId"]);
        let lineId = this.modalFormRef.current.getFieldValue("outboundLineId");
        let botId = this.modalFormRef.current.getFieldValue("botId");
        let env = this.modalFormRef.current.getFieldValue("env");
        console.log("modalLineSelectChange outboundLineId:" + lineId + " botId:" + botId);
        if (lineId == undefined || lineId == "" || botId == undefined || botId == "" || env == undefined || env == "") {
            console.log("参数不合法,无法获取号码下拉列表。");
            return;
        }
        // 获取并设置对应的线路号码下拉列表
        EndToEndTaskManageStore.listLineNumberSelected({botId: botId, lineId: lineId, env: env}, (result: any) => {
            console.log("listLineNumberSelected: res :" + JSON.stringify(result));
            if (result.status) {
                this.setState({
                    modalLineNumberSelected: result.data
                })
            } else {
                message.error(result.message);
            }
        })
    };

    // 弹窗提交字段验证通过
    modalFormValidateSuccessSave = () => {
        console.log("modalFormValidateSuccessSave");

        let fieldsMap = this.modalFormRef.current.getFieldsValue();
        this.state.modalLineSelected.forEach((item) => {
            if (fieldsMap.outboundLineId == item.id) {
                fieldsMap.outboundLineName = item.name;
            }
        });
        this.state.modalLineNumberSelected.forEach((item) => {
            if (fieldsMap.outboundCallNumberId == item.id) {
                fieldsMap.outboundCallNumber = item.name;
            }
        });
        this.state.modalTemplateSelected.forEach((item) => {
            if (fieldsMap.templateId == item.id) {
                fieldsMap.templateName = item.name;
            }
        });
        console.log(JSON.stringify(fieldsMap));

        EndToEndTaskManageStore.save(fieldsMap, (result: any) => {
            console.log("modalFormValidateSuccessSave: res :" + JSON.stringify(result));
            if (result.status) {
                message.success('保存成功');
                this.handleTableChange(1);
                this.handleCancel();
            } else {
                message.error(result.message);
            }
        })
    };

    // 弹窗提交字段验证失败
    modalFormValidateFailedAlert = () => {
        console.log("modalFormValidateFailedAlert");
        message.warning('必填字段不能为空，请您填写完整后再次保存。');
    };


    // --------------------------------------------- 【页面内容主体】 ------------------------------------------- [begin]
    render() {
        const {Option} = Select;
        const {
            page, tableLoading, modalLineSelected, modalTemplateSelected, modalLineNumberSelected, modalVisible
        } = this.state;

        return (
            <Card title="测试任务管理">
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Button type="primary" icon={<PlusCircleOutlined/>} onClick={this.showModal}>
                            创建测试任务
                        </Button>
                    </Col>
                    <Col span={6}/>
                    <Col span={6}/>
                    <Col span={6}/>
                </Row>
                <Form ref={this.searchFormRef} name="control-ref">
                    <Row gutter={[16, 16]}>
                        <Col span={4}>
                            <Form.Item
                                name="jobName"
                                label="任务名称"
                            >
                                <Input placeholder="任务名称"/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="botId"
                                label="机器人ID"
                            >
                                <Input placeholder="机器人ID"/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name="templateName"
                                label="AI话术"
                            >
                                <Input placeholder="AI话术"/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item
                                name={"outboundLineName"}
                                label="外呼线路"
                            >
                                <Input placeholder="外呼线路"/>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Button type="primary" icon={<SearchOutlined/>} onClick={this.searchButtonOnClick}>
                                查询
                            </Button>
                        </Col>
                        <Col span={2} onClick={this.onReset}>
                            <Button>重置</Button>
                        </Col>
                        <Col span={1}>
                        </Col>
                        <Col span={3}>
                        </Col>
                    </Row>
                </Form>
                <Table columns={this.columns} loading={tableLoading} dataSource={page ? page.result : []}
                       rowKey={"id"}
                       pagination={
                           page
                               ? {
                                   total: page.totalCount,
                                   current: page.currentPage,
                                   pageSize: page.pageSize,
                                   onChange: this.handleTableChange
                               }
                               : false
                       }/>


                <Modal
                    title="创建测试任务"
                    visible={modalVisible}
                    onCancel={this.handleCancel}
                    width={600}
                    footer={null}
                >
                    <Form
                        labelCol={{span: 6}}
                        wrapperCol={{span: 16}}
                        layout="horizontal"
                        ref={this.modalFormRef}
                        onFinish={this.modalFormValidateSuccessSave}
                        onFinishFailed={this.modalFormValidateFailedAlert}
                    >
                        <Form.Item
                            label="任务名称"
                            name="jobName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入任务名称',
                                },
                            ]}
                        >
                            <Input placeholder="任务名称"/>
                        </Form.Item>
                        <Form.Item label="测试环境" name="env"
                                   rules={[{
                                       required: true,
                                       message: '请选择测试环境',
                                   }]}>
                            <Select>
                                <Option value="0">KA-预发环境</Option>
                                <Option value="1">KA-线上环境</Option>
                                <Option value="2">云-预发环境</Option>
                                <Option value="3">云-线上环境</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="被测机器人ID"
                            name="botId"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入被测机器人ID',
                                },
                            ]}>
                            <Input onBlur={this.modalBotIdInputChange} placeholder="测试机器人ID"/>
                        </Form.Item>
                        <Form.Item label="AI话术" name="templateId"
                                   rules={[{
                                       required: true,
                                       message: '请选择AI话术',
                                   }]}>
                            <Select>
                                {modalTemplateSelected != undefined ? (modalTemplateSelected.map(elem => {
                                    return (<Option value={elem.id} key={elem.id}>{elem.name}</Option>)
                                })) : ""}
                            </Select>
                        </Form.Item>
                        <Form.Item label="外呼线路" name="outboundLineId"
                                   // rules={[{
                                   //     required: true,
                                   //     message: '请选择外呼线路',
                                   // }]}
                        >
                            <Select
                                onChange={this.modalLineSelectChange}
                            >
                                {modalLineSelected != undefined ? (modalLineSelected.map(elem => {
                                    return (<Option value={elem.id} key={elem.id}>{elem.name}</Option>)
                                })) : ""}
                            </Select>
                        </Form.Item>
                        <Form.Item label="外呼号码" name="outboundCallNumberId"
                                   // rules={[{
                                   //     required: true,
                                   //     message: '请选择外呼号码',
                                   // }]}
                        >
                            <Select>
                                {modalLineNumberSelected != undefined ? (modalLineNumberSelected.map(elem => {
                                    return (<Option value={elem.id} key={elem.id}>{elem.name}</Option>)
                                })) : ""}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="被测人姓名"
                            name="callee"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入被测被测人姓名',
                                },
                            ]}>
                            <Input placeholder="被测人姓名"/>
                        </Form.Item>
                        <Form.Item
                            label="被测人电话"
                            name="calleeNumber"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入被测被测人电话',
                                },
                            ]}>
                            <Input placeholder="被测人电话"/>
                        </Form.Item>
                        <Form.Item label="备注" name="jobDescription">
                            <Input.TextArea placeholder="备注信息可不填"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 6, span: 18}}>
                            <Row>
                                <Col span={4}>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Col>
                                <Col span={10}>
                                </Col>
                                <Col span={4}>
                                    <Button onClick={this.handleCancel}>
                                        取消
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}

export default AppPage
