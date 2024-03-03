export const numberToCardinal = (str: string): string => {

    const isNumeric = (str: string): boolean => {
        const regex = /^[0-9]+$/;
        return regex.test(str);
    };

    const one = (num: number): string => {
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

    const twoLessThanTwenty = (num: number): string => {
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

    const ten = (num: number): string => {
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

    const two = (num: number) => {
        if (num == 0) {
            return "";
        } else if (num < 10) {
            return one(num);
        } else if (num < 20) {
            return twoLessThanTwenty(num);
        } else {
            const tenner = Math.floor(num / 10);
            const rest = num % 10;

            if (rest !== 0) {
                return `${ten(tenner)} ${one(rest)}`;
            } else {
                return ten(tenner);
            }
        }
    };

    const three = (num: number) => {
        const hundred = Math.floor(num / 100);
        const rest = num % 100;

        if (hundred !== 0 && rest !== 0) {
            return `${one(hundred)} hundred ${two(rest)}`;
        } else if (rest !== 0) {
            return two(rest);
        } else {
            return `${one(hundred)} hundred`;
        }
    };

    if (!isNumeric(str)) {
        throw Error(`Can't convert the string to number: ${str}`);
    }

    const num = parseInt(str);
    if (num === 0) {
        return "zero";
    }

    const billion = Math.floor(num / 1_000_000_000);
    const million = Math.floor((num - billion * 1_000_000_000) / 1_000_000);
    const thousand = Math.floor((num - billion * 1_000_000_000 - million * 1_000_000) / 1_000);
    const rest = num - billion * 1_000_000_000 - million * 1_000_000 - thousand * 1000;

    let result = "";
    if (billion !== 0) {
        result += `${three(billion)} billion`;
    }

    if (million !== 0) {
        if (result) {
            result += " ";
        }

        result += `${three(million)} million`;
    }

    if (thousand !== 0) {
        if (result) {
            result += " ";
        }

        result += `${three(thousand)} thousand`;
    }

    if (rest != 0) {
        if (result) {
            result += " ";
        }

        result += three(rest);
    }

    return result;
};
