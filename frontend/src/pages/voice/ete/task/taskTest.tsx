import * as React from 'react'
import {ArrowLeftOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {
    Card,
    Button,
    Col,
    Row,
    Descriptions,
    message, List, Typography
} from 'antd';
import EndToEndTaskManageStore from '../../../../store/voice/EndToEndTaskManageStore'
import {RouteComponentProps} from 'react-router-dom'
import ObjectUtils from "@/utils/ObjectUtils";

type Props = {} & RouteComponentProps<{ id: string; jobName: string }>
type State = {}

class AppPage extends React.Component<Props, State> {
    state = {
        titleFixedStyle: {fontSize: 18, fontWeight: 8},
        titleFontStyle: {fontSize: 18, fontWeight: 8, color: "#09f"},
        answerFontStyle: {fontSize: 14, fontWeight: 4, color: "#09f"},
        jobId: -1,
        jobName: '',
        jobSettings: {
            venderId: '',
            speed: '',
            tone: '',
            volume: '',
            breakFilterWord: '',
            endDelay: '',
            silenceTime: '',
        },
        job: {
            id: '',
            botId: '',
            templateName: '',
            templateId: '',
            callee: '',
            calleeNumber: '',
            env: '',
            outboundLineName: '',
            outboundLineId: '',
            outboundCallNumber: '',
            outboundCallNumberId: '',
            jobDescription: '',
            envText: ''
        },
        testBtnLoading: false,
        toneDict: {
            "0": "桃桃（女声）",
            "1": "斌斌（男声）",
            "4": "郭靖（男声）",
            "3": "婷婷（女声）"
        },
        speedDict: {
            0.5: "慢",
            1.0: "正常",
            1.5: "较快",
            2.0: "最快"
        },
        jobLogs: []
    };
    interval: number;

    componentDidMount() {
        const {match} = this.props;
        console.log('componentDidMount');
        this.setState({
            jobId: match.params.id,
            jobName: match.params.jobName
        });

        this.initJobInfoShow();
        this.changeJobLogs();
        this.changeJobBtnLoading();

        this.interval = window.setInterval(() => {
            this.changeJobLogs();
            this.changeJobBtnLoading();
        }, 3000)
    }


    initJobInfoShow = () => {
        const {match} = this.props;

        // 数据初始化展示
        EndToEndTaskManageStore.getJobAndSettings({jobId: match.params.id}, (result: any) => {
            console.log(result);
            if (result.status) {
                this.setState({
                    jobSettings: {
                        speed: this.state.speedDict[parseFloat(result.data.jobSettings.speed)],
                        tone: this.state.toneDict[result.data.jobSettings.tone],
                        volume: result.data.jobSettings.volume,
                        breakFilterWord: result.data.jobSettings.breakFilterWord,
                        endDelay: result.data.jobSettings.endDelay,
                        silenceTime: result.data.jobSettings.silenceTime,
                        venderId: result.data.jobSettings.venderId,
                    },
                    job: {
                        id: result.data.job.id,
                        botId: result.data.job.botId,
                        templateName: result.data.job.templateName,
                        templateId: result.data.job.templateId,
                        callee: result.data.job.callee,
                        calleeNumber: result.data.job.calleeNumber,
                        env: result.data.job.env,
                        outboundLineName: result.data.job.outboundLineName,
                        outboundLineId: result.data.job.outboundLineId,
                        outboundCallNumber: result.data.job.outboundCallNumber,
                        outboundCallNumberId: result.data.job.outboundCallNumberId,
                        jobDescription: result.data.job.jobDescription,
                        envText: this.getEnvText(result.data.job.env)
                    },
                    testBtnLoading: (result.data.job.status == 2)
                })
            } else {
                message.error(result.message);
            }
        })
    };

    changeJobBtnLoading = () => {
        const {match} = this.props;
        // 数据初始化展示
        EndToEndTaskManageStore.checkJobIsOrNotReadyById({jobId: match.params.id}, (result: any) => {
            console.log("获取任务信息:" + JSON.stringify(result));
            if (result.status) {
                this.setState({
                    testBtnLoading: !(result.data)
                });
            }else {
                message.error(result.message)
            }
        })
    };

    changeJobLogs = () => {
        const {match} = this.props;
        // 数据初始化展示
        EndToEndTaskManageStore.queryJobLogs({jobId: match.params.id}, (result: any) => {
            console.log("获取日志信息:" + JSON.stringify(result));
            if (result.status) {
                this.setState({
                    jobLogs: result.data
                })
            }
        })
    };

    // test
    testJobRun = () => {
        const {match} = this.props;
        if (this.state.jobSettings.venderId == undefined || this.state.jobSettings.venderId == "") {
            message.error("当前测试任务未获取到VenderId,无法执行测试。");
        }
        this.setState({
            testBtnLoading: true
        });
        EndToEndTaskManageStore.runTestJob({
            jobId: match.params.id,
            venderId: this.state.jobSettings.venderId
        }, (result: any) => {
            console.log(result);
            if (result.status) {
                message.success("打电话任务推送成功！");
            } else {
                message.error(result.message);
            }
        });

    };

    getEnvText(env) {
        let envText = "";
        switch (env) {
            case 0:
                envText = "KA-预发环境";
                break;
            case 1:
                envText = "KA-线上环境";
                break;
            case 2:
                envText = "EXT-预发环境";
                break;
            case 3:
                envText = "EXT-线上环境";
                break;
            default:
                envText = "环境未知";
        }
        return envText;
    }

    render() {
        const {
            titleFixedStyle, titleFontStyle, answerFontStyle, jobName, jobSettings, job, testBtnLoading, jobLogs
        } = this.state;
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={6} style={titleFixedStyle}>
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
                    <Row style={{marginTop: 10}}>
                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <Descriptions title="设置详情" layout="horizontal" column={2}>
                                        <Descriptions.Item label="店铺ID" span={2}><span
                                            style={answerFontStyle}>{jobSettings.venderId}</span></Descriptions.Item>
                                        <Descriptions.Item label="TTS合成音色"><span
                                            style={answerFontStyle}>{jobSettings.tone}</span></Descriptions.Item>
                                        <Descriptions.Item label="ASR对应领域"><span
                                            style={answerFontStyle}>无</span></Descriptions.Item>
                                        <Descriptions.Item label="TTS合成语速"><span
                                            style={answerFontStyle}>{jobSettings.speed}</span></Descriptions.Item>
                                        <Descriptions.Item label="NLP置信度"><span
                                            style={answerFontStyle}>0.5</span></Descriptions.Item>
                                        <Descriptions.Item label="TTS合成音量"><span
                                            style={answerFontStyle}>{jobSettings.volume}</span></Descriptions.Item>
                                        <Descriptions.Item label="ASR置信度"><span
                                            style={answerFontStyle}>0.5</span></Descriptions.Item>
                                        <Descriptions.Item label="静音时长"><span
                                            style={answerFontStyle}>{jobSettings.silenceTime}</span></Descriptions.Item>
                                        <Descriptions.Item label="VAD打断方式"><span
                                            style={answerFontStyle}>无</span></Descriptions.Item>
                                        <Descriptions.Item label="收音间隔设置"><span
                                            style={answerFontStyle}>{jobSettings.endDelay}</span></Descriptions.Item>
                                        <Descriptions.Item label="忽略语气词"><span
                                            style={answerFontStyle}>{jobSettings.breakFilterWord}</span></Descriptions.Item>
                                    </Descriptions>
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Descriptions title="任务详情" layout="horizontal" column={2}>
                                            <Descriptions.Item label="测试环境" span={2}><span
                                                style={answerFontStyle}>{job.envText}</span></Descriptions.Item>
                                            <Descriptions.Item label="机器人ID"><span
                                                style={answerFontStyle}>{job.botId}</span></Descriptions.Item>
                                            <Descriptions.Item label="AI话术"><span
                                                style={answerFontStyle}>{job.templateName}</span></Descriptions.Item>
                                            <Descriptions.Item label="外呼线路"><span
                                                style={answerFontStyle}>{job.outboundLineName}</span></Descriptions.Item>
                                            <Descriptions.Item label="外呼号码"><span
                                                style={answerFontStyle}>{job.outboundCallNumber}</span></Descriptions.Item>
                                            <Descriptions.Item label="被测人姓名"><span
                                                style={answerFontStyle}>{job.callee}</span></Descriptions.Item>
                                            <Descriptions.Item label="被测人电话"><span
                                                style={answerFontStyle}>{job.calleeNumber}</span></Descriptions.Item>
                                            <Descriptions.Item label="任务描述" span={2}><span
                                                style={answerFontStyle}>{job.jobDescription}</span></Descriptions.Item>
                                        </Descriptions>
                                    </Row>
                                    <Row style={{marginTop: 30}}>
                                        <Col span={18}>
                                        </Col>
                                        <Col span={4}>
                                            <Button type={"primary"} icon={<PlayCircleOutlined/>}
                                                    size={"large"} loading={testBtnLoading}
                                                    onClick={this.testJobRun}>开始测试</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <Card style={{marginTop: 10}}>
                    <Row>
                        <Col span={6} style={titleFixedStyle}>
                            测试详情
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
                                    return (<div style={{marginTop:5}}><span>{elem.content}</span><hr /></div>)
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
