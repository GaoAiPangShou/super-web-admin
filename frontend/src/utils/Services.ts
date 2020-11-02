import Axios from 'axios'

export const STATE_SUCCESS: string = 'SUCCESS';
export const STATE_FAILURE: string = 'FAILURE';
export const STATE_ERROR: string = 'ERROR';

const host: string = 'http://127.0.0.1:8080/';

export default class Services {

    static async post<T>(url: string, data: object) {
        const result: any = await Axios.post(url, data);
        switch (result.data.state) {
            case STATE_SUCCESS:
                let raw = result.data.data;
                try {
                    raw = JSON.parse(raw)
                } catch (err) {
                    // do nothing
                }
                result.data.data = raw;
                return Promise.resolve<T>(result.data.data);
            case STATE_ERROR:
                return Promise.reject<T>({message: result.data.result});
            case STATE_FAILURE:
                if (/Invalid Session./.test(result.data.result)) {
                    window.location.href = `https://passport.jd.com/new/login.aspx?ReturnUrl=${location.href}`;
                    return
                }
                return Promise.reject<T>({message: result.data.result});
            default:
                return Promise.reject<T>({message: result.data.result});
        }
    }

    static async get<T>(url: string, data: any, useUserPin: boolean) {
        if (useUserPin) {
            data.userPin = "webchattest_1015";
            data.userName = "webchattest_1015";
        }
        const result: any = await Axios.get(url, {params: data});
        if (url.startsWith('https://') || url.startsWith('http://')) {
            return Promise.resolve(result.data)
        }
        switch (result.data.state) {
            case STATE_SUCCESS:
                let raw = result.data.data;
                try {
                    raw = JSON.parse(raw)
                } catch (err) {
                    // do nothing
                }
                result.data.data = raw;
                return {status: true, data: result.data.data};
            case STATE_ERROR:
                return {status: false, message: "系统异常，请联系后端开发同学！"};
            case STATE_FAILURE:
                return {status: false, message: result.data.result};
            default:
                return Promise.reject<T>({message: "系统繁忙，请稍后再试！"});
        }
    }

}
