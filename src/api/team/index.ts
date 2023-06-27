
import myAxios from "../../plugins/myAxios";


/**
 * @description:创建队伍
 * @param data
 */
export const createTeam = (data)=>{
    return myAxios.post('/team/add',data);
}

/**
 * @description:获取队伍列表数据
 * @param params
 */
export const getTeamList = (params)=>{
    return myAxios.get('/team/list/page',{
        params
    })
}

/**
 * @description:加入队伍
 * @param data
 */
export const joinTeams = (data)=>{
    return myAxios.post('/team/join',data)
}

/**
 * @description:更新队伍数据
 * @param data 队伍表单数据
 * @returns
 */
export const updateTeam = (data:any)=>{
    return myAxios.post("team/update",data)
}

/**
 * @description:获取队伍详情
 * @param id
 * @returns
 */
export const getTeamDetail = (id:any)=>{
    return myAxios.get('/team/get?id=' + id)
}

/**
 * @description:获取我创建的队伍
 * @param params
 */
export const getTeamCreate = (params)=>{
    return myAxios.get('/team/list/my/create',{
        params
    });
}

/**
 * @description:获取我加入的队伍
 * @param params
 */
export const getTeamJoin = (params)=>{
    return myAxios.get('/team/list/my/join',{
        params
    });
}

/**
 * @description:退出队伍
 * @param id
 */
export const quitTeam = (id)=>{
    return myAxios.post('/team/quit?teamId=' + id);
}
