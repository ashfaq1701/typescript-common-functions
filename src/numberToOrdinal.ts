export const numberToOrdinal = (str: string): string => {
    const isNumeric = (str: string): boolean => {
        const regex = /^[0-9]+$/;
        return regex.test(str);
    };

    const oneInCardinal = (num: number): string => {
        switch (num) {
            case 1:
                return "one";
            case 2:
                return "two";
            case 3:
                return "three";
            case 4:
                return "four";
            case 5:
                return "five";
            case 6:
                return "six";
            case 7:
                return "seven";
            case 8:
                return "eight";
            case 9:
                return "nine";
            default:
                throw Error(`Could not convert one digit to ordinal : ${num}`);
        }
    };

    const oneInOrdinal = (num: number): string => {
        switch (num) {
            case 1:
                return "first";
            case 2:
                return "second";
            case 3:
                return "third";
            case 4:
                return "fourth";
            case 5:
                return "fifth";
            case 6:
                return "sixth";
            case 7:
                return "seventh";
            case 8:
                return "eighth";
            case 9:
                return "ninth";
            default:
                throw Error(`Could not convert one digit to ordinal : ${num}`);
        }
    };

    const twoLessThanTwentyInCardinal = (num: number): string => {
        switch (num) {
            case 10:
                return "ten";
            case 11:
                return "eleven";
            case 12:
                return "twelve";
            case 13:
                return "thirteen";
            case 14:
                return "fourteen";
            case 15:
                return "fifteen";
            case 16:
                return "sixteen";
            case 17:
                return "seventeen";
            case 18:
                return "eighteen";
            case 19:
                return "nineteen";
            default:
                throw Error(`Could not convert two digits to ordinal : ${num}`);
        }
    };

    const twoLessThanTwentyInOrdinal = (num: number): string => {
        switch (num) {
            case 10:
                return "tenth";
            case 11:
                return "eleventh";
            case 12:
                return "twelfth";
            case 13:
                return "thirteenth";
            case 14:
                return "fourteenth";
            case 15:
                return "fifteenth";
            case 16:
                return "sixteenth";
            case 17:
                return "seventeenth";
            case 18:
                return "eighteenth";
            case 19:
                return "nineteenth";
            default:
                throw Error(`Could not convert two digits to ordinal : ${num}`);
        }
    };

    const tenInCardinal = (num: number): string => {
        switch (num) {
            case 2:
                return "twenty";
            case 3:
                return "thirty";
            case 4:
                return "forty";
            case 5:
                return "fifty";
            case 6:
                return "sixty";
            case 7:
                return "seventy";
            case 8:
                return "eighty";
            case 9:
                return "ninety";
            default:
                throw Error(`Could not convert tenth position to ordinal : ${num}`);
        }
    };

    const tenInOrdinal = (num: number): string => {
        const cardinal = tenInCardinal(num);
        return cardinal.substring(0, cardinal.length - 1) + "ieth";
    };

    const twoInCardinal = (num: number) => {
        if (num == 0) {
            return "";
        } else if (num < 10) {
            return oneInCardinal(num);
        } else if (num < 20) {
            return twoLessThanTwentyInCardinal(num);
        } else {
            const tenner = Math.floor(num / 10);
            const rest = num % 10;

            if (rest !== 0) {
                return `${tenInCardinal(tenner)} ${oneInCardinal(rest)}`;
            } else {
                return tenInCardinal(tenner);
            }
        }
    };

    const twoInOrdinal = (num: number) => {
        if (num == 0) {
            return "";
        } else if (num < 10) {
            return oneInOrdinal(num);
        } else if (num < 20) {
            return twoLessThanTwentyInOrdinal(num);
        } else {
            const tenner = Math.floor(num / 10);
            const rest = num % 10;

            if (rest !== 0) {
                return `${tenInCardinal(tenner)} ${oneInOrdinal(rest)}`;
            } else {
                return tenInOrdinal(tenner);
            }
        }
    };

    const threeInCardinal = (num: number) => {
        const hundred = Math.floor(num / 100);
        const rest = num % 100;

        if (hundred !== 0 && rest !== 0) {
            return `${oneInCardinal(hundred)} hundred ${twoInCardinal(rest)}`;
        } else if (rest !== 0) {
            return twoInCardinal(rest);
        } else {
            return `${oneInCardinal(hundred)} hundred`;
        }
    };

    const threeInOrdinal = (num: number) => {
        const hundred = Math.floor(num / 100);
        const rest = num % 100;

        if (hundred !== 0 && rest !== 0) {
            return `${oneInCardinal(hundred)} hundred ${twoInOrdinal(rest)}`;
        } else if (rest !== 0) {
            return twoInOrdinal(rest);
        } else {
            return `${oneInCardinal(hundred)} hundredth`;
        }
    };

    if (!isNumeric(str)) {
        throw Error(`Can't convert the string to number: ${str}`);
    }

    const num = parseInt(str);
    if (num === 0) {
        return "zeroth";
    }

    const billion = Math.floor(num / 1_000_000_000);
    const million = Math.floor((num - billion * 1_000_000_000) / 1_000_000);
    const thousand = Math.floor((num - billion * 1_000_000_000 - million * 1_000_000) / 1_000);
    const rest = num - billion * 1_000_000_000 - million * 1_000_000 - thousand * 1000;

    const parts = [];
    if (rest !== 0) {
        parts.push(threeInOrdinal(rest));
    }

    if (thousand !== 0) {
        if (parts.length == 0) {
            parts.push(threeInCardinal(thousand) + " thousandth");
        } else {
            parts.push(threeInCardinal(thousand) + " thousand");
        }
    }

    if (million !== 0) {
        if (parts.length == 0) {
            parts.push(threeInCardinal(million) + " millionth");
        } else {
            parts.push(threeInCardinal(million) + " million");
        }
    }

    if (billion !== 0) {
        if (parts.length == 0) {
            parts.push(threeInCardinal(billion) + " billionth");
        } else {
            parts.push(threeInCardinal(billion) + " billion");
        }
    }

    const reversedParts = parts.reverse();
    return reversedParts.join(" ");
};
