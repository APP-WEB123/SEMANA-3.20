import {ValidationError} from "./errors.js";

export class Currency{
    static #VALID_CODES = ['USD','EUR','GBP','JPY'];
    #code;

    constructor(code){
        if(!Currency.#VALID_CODES.includes(code))
            throw new ValidationError(`Invalid code: ${code}. Must be one of  ${Currency.#VALID_CODES.join(', ')}`);
        this.#code = code;
    }
}