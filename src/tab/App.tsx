import { Divider } from 'antd';

import Note from './components/note';

import './App.scss';

const App = () => (
    <div className="app">
        <div className="content">
            <Divider orientation="center">随手记</Divider>
            <Note />
            <Divider orientation="center">随手记</Divider>
            1. 构建 nextjs 项目 2. bitou-cli 启停一个页面；3. 我来展示 work.bitou.tech
            的数据模块，以及最近编辑内容
        </div>
        <div className="website">
            <iframe src="https://work.bitou.tech/home/rise" width={'100%'} height={'100%'} />
        </div>
    </div>
);

export default App;
