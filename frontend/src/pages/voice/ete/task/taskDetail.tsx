import * as React from 'react'
import {ArrowLeftOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {Table, Tag, Space, Card, Button, Col, Row, Input, Select, Modal, Tooltip, Form, message} from 'antd';
import EndToEndTaskManageStore from '../../../../store/voice/EndToEndTaskManageStore'
import {Link, RouteComponentProps} from 'react-router-dom'
import ObjectUtils from "@/utils/ObjectUtils";
import {FormInstance} from "antd/lib/form";

type Props = {} & RouteComponentProps<{ id: string; jobName: string }>
type State = {}

class AppPage extends React.Component<Props, State> {
    state = {
        textStyle: {fontSize: 18, fontWeight: 8},
        titleFixedStyle: {fontSize: 18, fontWeight: 8},
        titleFontStyle: {fontSize: 18, fontWeight: 8, color: "#09f"},
        tableLoading: false,
        page: {
            totalCount: 0,
            currentPage: 1,
            result: [],
            pageSize: 10
        },
        jobName: '',
        jobLogs: []
    };
    columns = [
        {
            title: '版本编号',
            dataIndex: 'id',
            key: 'id',
            width: '6%'
        },
        {
            title: '测试时间',
            dataIndex: 'createTimeValue',
            width: '15%'
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        this.handleSearchLog(record.id)
                    }} className="divider-after">
                        查看
                    </Button>
                </Space>
            ),
        }
    ];

    componentDidMount() {
        const {match} = this.props;
        console.log('componentDidMount');
        console.log("详情页面跳转参数：" + JSON.stringify(match.params));
        this.setState({
            jobName: match.params.jobName
        });
        this.handleTableChange(1, {jobId: match.params.id});
        this.queryJobLogs({jobId: match.params.id});
    }

    // 表格数据变更函数
    handleTableChange = (page, options?: any) => {
        this.setState({tableLoading: true});
        this.getTableDataList(page, options)
    };


    // 获取表格数据
    getTableDataList(page, options?: any) {
        EndToEndTaskManageStore.basicJobItemList({...options, currentPage: page, pageSize: 3}, (result: any) => {
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

    queryJobLogs(options?: any) {
        EndToEndTaskManageStore.queryJobLogs({...options}, (result: any) => {
            if (result.status) {
                this.setState({
                    jobLogs: result.data
                })
            } else {
                message.error(result.message);
            }
        })
    };

    handleSearchLog = (itemId) => {
        const {match} = this.props;
        this.queryJobLogs({jobId: match.params.id, jobItemId: itemId});
    };

    render() {
        const {
            textStyle, titleFixedStyle, titleFontStyle, jobName, tableLoading, page, jobLogs
        } = this.state;
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={6} style={textStyle}>
                            <span>
                                <Button type="link" icon={<ArrowLeftOutlined style={{fontSize: 22, color: "#111"}}/>}
                                        href={"#/voice/ete/task/main"}>
                                </Button>
                                任务名称:&nbsp;
                            </span>
                            <span style={titleFontStyle}>{jobName}</span>
                        </Col>
                        <Col span={6}>
                        </Col>
                        <Col span={6}>
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <br/>
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
                        </Col>
                    </Row>
                </Card>

                <Card style={{marginTop: 10}}>
                    <Row>
                        <Col span={6} style={titleFixedStyle}>
                            历史详情日志
                        </Col>
                        <Col span={6}>
                        </Col>
                        <Col span={6}>
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                    <Row style={{marginTop: 10}}>
                        <Col span={24}>
                            <div style={{width: "100%", height: 300, overflowY: "scroll", border: "3px solid #ccc"}}>
                                {jobLogs != undefined ? (jobLogs.map(elem => {
                                    return (<div style={{marginTop: 5}}><span>{elem.content}</span>
                                        <hr/>
                                    </div>)
                                })) : ""}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default AppPage
