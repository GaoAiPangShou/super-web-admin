import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom'
import {Row, Col, Layout, ConfigProvider} from 'antd'
import * as moment from 'moment'
import 'moment/locale/zh-cn'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import './App.less'

import LeftMenu from "./components/letMenu"
import Home from './pages/home/index'
import Index from './pages/index/index'
import TaskMain from './pages/voice/ete/task/taskMain'
import TaskTest from './pages/voice/ete/task/taskTest'
import TaskDetail from './pages/voice/ete/task/taskDetail'

const App = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/index" exact component={Index}/>
            <Route path="/voice/ete/task/main" exact component={TaskMain}/>
            <Route path="/voice/ete/task/test/:id/:jobName" component={TaskTest}/>
            <Route path="/voice/ete/task/detail/:id/:jobName" component={TaskDetail}/>
        </Switch>
    )
}

// new Mock().intercept(Services, 'post');
moment.locale('zh-CN');


// const obj = watermark({});

function render() {
    ReactDOM.render(
        <HashRouter>
            <Layout>
                <Layout.Header className="header">
                    <div className="logo">
                        <span title="通用管理后台for我滴儿们"/>
                        <span className="title">通用管理后台</span>
                    </div>
                </Layout.Header>

                <Layout>
                    <Layout.Sider theme="light" style={{background: "#fff"}}>
                        <LeftMenu/>
                    </Layout.Sider>

                    <Layout.Content>
                        <ConfigProvider locale={zhCN}>
                            <App/>
                        </ConfigProvider>
                    </Layout.Content>

                </Layout>
            </Layout>
        </HashRouter>
        ,
        document.getElementById('root'),
        () => {
        }
    )
}

render();
