import { customError } from "./custom-error";

export class UnAuthenticatedError extends customError{
    statusCode = 401;

    constructor() {
        super("un authenticated");

        Object.setPrototypeOf(this, UnAuthenticatedError.prototype);
    };

    serializeErrors() {
        return [
            {message : "UnAuthenticated"}
        ]
    };
}