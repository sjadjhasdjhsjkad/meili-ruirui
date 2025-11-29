// mock/user.js

function createUserList() {
    return [
        {
            userId: 1,
            avatar: 'http://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '123456',
            desc: '平台管理员',
            role: ['平台管理员'],
            buttons: ['cuser', 'detail'],
            routes: ['home'],
            token: 'Admin-Token',
        },
        {
            userId: 2,
            avatar: 'http://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '123456',
            desc: '系统管理员',
            role: ['系统管理员'],
            buttons: ['cuser', 'detail'],
            routes: ['home'],
            token: 'System-Token',
        }
    ]
}

export default [
    // ============================
    // 用户登录接口
    // ============================
    {
        url: '/api/login',
        method: 'post',
        response: ({body}) => {
            const {username, password} = body;

            // 查找用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password
            );

            // ❌ 用户不存在
            if (!checkUser) {
                return {
                    code: 201,
                    data: {message: "账号或者密码不正确"}
                };
            }

            // ✅ 返回 token
            return {
                code: 200,
                data: {token: checkUser.token}
            };
        },
    },

    // ============================
    // 获取用户信息接口
    // ============================
    {
        url: '/api/user/info',
        method: 'get',
        response: ({headers}) => {
            // 通常 token 放在 headers.authorization
            const token = headers?.authorization;

            const checkUser = createUserList().find(
                (item) => item.token === token
            );

            // ❌ token 无效
            if (!checkUser) {
                return {
                    code: 201,
                    data: {message: '获取用户信息失败'}
                };
            }

            // ✅ 发送用户信息
            return {
                code: 200,
                data: checkUser
            };
        },
    },
];
