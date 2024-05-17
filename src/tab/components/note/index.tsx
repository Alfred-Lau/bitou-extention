import { Input } from 'antd';

export default function Note() {
    return (
        <div>
            <Input.TextArea placeholder="输入一些笔记" />
            需要开发一些 ai 能力，生成待办事项，生成日报，生成周报，生成月报
        </div>
    );
}
