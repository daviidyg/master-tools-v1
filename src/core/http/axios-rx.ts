import Axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";
import {defer, from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import axiosRetry from "axios-retry";
import {environment} from "@seed/environment";

export enum HTTPProtocol {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export interface ReactiveXHR {
    get<T = any>(url: string, config?: AxiosRequestConfig): Observable<T>;
    delete(url: string, config?: AxiosRequestConfig): Observable<any>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T>;
}

export interface AxiosReactiveRequestConfig extends AxiosRequestConfig {
    uninterceptable?: boolean;
    raw?: boolean;
}

export class AxiosReactive implements ReactiveXHR {

    private readonly _http: AxiosInstance;

    constructor(baseURL: string) {
        this._http = Axios.create({baseURL, validateStatus: () => true, timeout: 15000});
        axiosRetry(this._http, {
            retries: 3,
            shouldResetTimeout: true,
            retryDelay: () => 5000,
            retryCondition: (error) => (axiosRetry as any).isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED'
        });
    }

    public get<T = any>(url: string, config?: AxiosReactiveRequestConfig): Observable<T> {
        return this._doXHR(HTTPProtocol.GET, url, config);
    }

    public post<T = any>(url: string, data?: any, config?: AxiosReactiveRequestConfig): Observable<T> {
        return this._doXHR(HTTPProtocol.POST, url, config, data);
    }

    public put<T = any>(url: string, data?: any, config?: AxiosReactiveRequestConfig): Observable<T> {
        return this._doXHR(HTTPProtocol.PUT, url, config, data);
    }

    public patch<T = any>(url: string, data?: any, config?: AxiosReactiveRequestConfig): Observable<T> {
        return this._doXHR(HTTPProtocol.PATCH, url, config, data);
    }

    public delete(url: string, config?: AxiosReactiveRequestConfig): Observable<void> {
        return this._doXHR(HTTPProtocol.DELETE, url, config);
    }

    private _doXHR<T>(method: HTTPProtocol, url: string, config?: AxiosReactiveRequestConfig, data?: object): Observable<T> {
        let requestFactory: () => AxiosPromise<T>;

        switch (method) {
            case HTTPProtocol.GET:
                requestFactory = this._http.get.bind(this._http, url, config);
                break;
            case HTTPProtocol.POST:
                requestFactory = this._http.post.bind(this._http, url, data, config);
                break;
            case HTTPProtocol.PUT:
                requestFactory = this._http.put.bind(this._http, url, data, config);
                break;
            case HTTPProtocol.PATCH:
                requestFactory = this._http.patch.bind(this._http, url, data, config);
                break;
            case HTTPProtocol.DELETE:
                requestFactory = this._http.delete.bind(this._http, url, config);
                break;
            default:
                throw new Error('Method not supported');
        }

        return defer(() =>
            from(requestFactory()).pipe(map((res: AxiosResponse<T>) => {
                const config: AxiosReactiveRequestConfig = res.config;

                const status: number = res.status;
                if (status >= 400 && status < 600) {
                    throw res;
                }

                if (config.raw) {
                    return res as unknown as T;
                }

                return res.data;
            }))
        );
    }
}

export const contextUrl: string = environment.apiURL;
export const axiosReactive = new AxiosReactive(contextUrl);

