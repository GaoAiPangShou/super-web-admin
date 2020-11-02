import {callback, invoke, PageDataD} from '../IStore'
import Services from '../../utils/Services'

const {get, post} = Services;


type SaveQuery = {
    jobName: string;
    botId: number;

    outboundCallNumberId: number;
    outboundCallNumber: number;

    outboundLineId: number;
    outboundLineName: string;

    templateId: number;
    templateName: string;

    callee: string;
    calleeNumber: string;

    jobDescription: string;
}

class EndToEndTaskManageStore {

    static async list(param: any, callback?: callback) {
        try {
            let res = await get('/api/test/project/fronted/list', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async listAiTemplateSelected(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/getAiTemplates', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async listCallLineSelected(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/getOutlines', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async listLineNumberSelected(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/getOutNumbers', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async save(param: SaveQuery, callback?: callback) {
        try {
            let res = await get('/api/basicJob/insert', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async getJobAndSettings(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/getJobAndSettings', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async deleteJob(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/deleteByJobId', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async runTestJob(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/runTestJob', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async queryJobLogs(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/queryJobLogs', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }

    static async checkJobIsOrNotReadyById(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/checkJobIsOrNotReadyById', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }


    static async basicJobItemList(param: any, callback?: callback) {
        try {
            let res = await get('/api/basicJob/listJobItem', param, true);
            invoke(callback, res)
        } catch (err) {
            invoke(callback, false, {status: false, message: err.message})
        }
    }
}

export default EndToEndTaskManageStore