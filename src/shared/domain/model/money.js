import {ValidationError} from "./errors.js";
import {Currency} from "./currency.js";

/**
 * Value object representing an amount of money with a currency.
 * Immutable and support basic operations like addition and multiplication.
 */
export class Money{
    #amount;
    #currency;
    /*
    *Creates a new money  instance
    * @param {Object} params -  Parameter for creating Money
    * @param {number} params.amount - The amount of money (non-negative)
    * @param {currency} params.currency - The currency of the money (must be)
    * */
    constructor({amount, currency}){
        if(!Number.isFinite(amount)|| amount < 0)
            throw new ValidationError("Amount must be a non-negative number");
        if(!(currency instanceof Currency))
            throw new ValidationError("Currency must be a valid Currency object.");
        this.#amount = Number(amount.toFixed(2));
        this.#currency = currency;
    }

    get amount(){
        return  this.#amount;
    }

    get currency(){
        return this.#currency;
    }
    /**
     * */
    add(other){
        if(!(other instanceof  Money) || !this.#currency.equals(other.currency))
            throw new ValidationError("Cannot add Money with difference");
        return new Money({
            amount:this.#amount + other.amount,
            currency:this.#currency});
    }
    multiply(multiplier){
        if(!(Number.isFinite(multiplier))|| multiplier <0)
            throw new ValidationError("Multiplier must be a non-negative number");
        return new Money({
            amount:this.#amount * multiplier,
            currency:this.#currency});
    }

    toString(){
        return `${this.#currency.code} ${this.#currency.toFixed(2)}`;
    }

    equals(other){
        return(other instanceof Money
            && this.#amount === other.amount
            && this.#currency.equals(other.currency));
    }

}