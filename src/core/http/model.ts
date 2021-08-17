import {Subject} from "rxjs";

enum Severity {
    SUCCESS = "success",
    WARN = "warn",
    INFO = "info",
    ERROR = "error"
}

export interface ResponseMessage {
    severity: Severity;
    summary: string;
    detail: string;
    field: string;
}

export interface Resolvable<T> {
    $unsubscribe: Subject<void>;
    componentDidResolve(data: T): void;
}

export interface ResponseList<T> {
    list: Array<T>
}

export interface ControllerResponse<T> {
   data: T;
   messages:  ResponseMessage[];
   httpStatus: string;
}
