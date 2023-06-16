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
