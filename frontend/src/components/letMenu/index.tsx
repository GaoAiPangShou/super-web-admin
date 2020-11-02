import * as React from 'react';
import {Menu, Button} from 'antd';
import {
    BugOutlined
} from '@ant-design/icons';
import {useParams, useRouteMatch, useHistory, useLocation} from 'react-router-dom';

const {SubMenu} = Menu;

export default function leftMenu(props) {
    const {menu, id} = useParams() as any;
    const {path, url} = useRouteMatch();
    const history = useHistory()
    const {pathname} = useLocation();
    let [current, setCurrent] = React.useState('index');
    React.useEffect(() => {
        setCurrent(pathname)
    }, [pathname]);


    return (
        <Menu
            onClick={(e: any) => {
                setCurrent(e.key)
            }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
        >
            <SubMenu key="sub1" icon={<BugOutlined/>} title="测试导航">
                <Menu.Item key="/home"><a href="#/home">Home页面</a></Menu.Item>
                <Menu.Item key="/index"><a href="#/index">Index页面</a></Menu.Item>
            </SubMenu>
        </Menu>
    );
}
