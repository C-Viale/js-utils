type PSBCParams = {
    percentage: number;
    startColor: string;
    endColor?: string;
    useLinearBlending?: boolean;
    debug?: boolean;
};

type RGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
};

export default function pSBC({
    percentage,
    startColor,
    endColor,
    useLinearBlending,
}: PSBCParams) {
    if (isInvalidParams(percentage, startColor, endColor)) {
        return startColor;
    }

    let resultIsRGB = startColor.length > 9;

    if (typeof endColor == "string") {
        if (endColor === "c") {
            resultIsRGB = !resultIsRGB;
        } else {
            resultIsRGB = endColor.length > 9;
        }
    }

    const startChannels = extractChannels(startColor);
    const percentageIsNegative = percentage < 0;

    let endChannels;
    if (endColor && endColor !== "c") {
        endChannels = extractChannels(endColor);
    } else if (percentageIsNegative) {
        endChannels = { r: 0, g: 0, b: 0, a: -1 };
    } else {
        endChannels = { r: 255, g: 255, b: 255, a: -1 };
    }

    const absolutePercent = percentageIsNegative ? percentage * -1 : percentage;
    const percentDecimal = 1 - absolutePercent;

    if (startChannels == null || endChannels == null) {
        return startColor;
    }

    let r = 0,
        g = 0,
        b = 0;

    if (useLinearBlending) {
        r = Math.round(percentDecimal * startChannels.r + absolutePercent * endChannels.r);
        g = Math.round(percentDecimal * startChannels.g + absolutePercent * endChannels.g);
        b = Math.round(percentDecimal * startChannels.b + absolutePercent * endChannels.b);
    } else {
        r = BlendChannelLOG(startChannels.r, endChannels.r, percentDecimal, absolutePercent);
        g = BlendChannelLOG(startChannels.g, endChannels.g, percentDecimal, absolutePercent);
        b = BlendChannelLOG(startChannels.b, endChannels.b, percentDecimal, absolutePercent);
    }

    const startAlpha = startChannels.a;
    const endAlpha = endChannels.a;

    const resultHasAlpha = startAlpha >= 0 || endAlpha >= 0;
    const resultAlpha = resultHasAlpha
        ? startAlpha < 0
            ? endAlpha
            : endAlpha < 0
                ? startAlpha
                : startAlpha * percentDecimal + endAlpha * absolutePercent
        : 0;

    if (resultIsRGB) {
        const alphaPrefix = resultHasAlpha ? "a" : "";
        const alpha = resultHasAlpha ? `,${Math.round(resultAlpha * 1000) / 1000}` : "";

        return `rgb${alphaPrefix}(${r},${g},${b}${alpha})`;
    } else {
        return `#${(
            4294967296 +
            r * 16777216 +
            g * 65536 +
            b * 256 +
            (resultHasAlpha ? Math.round(resultAlpha * 255) : 0)
        )
            .toString(16)
            .slice(1, resultHasAlpha ? undefined : -2)}`;
    }
}

function isInvalidParams(
    percentage: number,
    startColor: string,
    endColor: string | undefined
) {
    return (
        typeof percentage != "number" ||
        percentage < -1 ||
        percentage > 1 ||
        typeof startColor != "string" ||
        (startColor[0] != "r" && startColor[0] != "#") ||
        (endColor && typeof endColor !== "string")
    );
}

function BlendChannelLOG(start: number, end: number, dec: number, abs: number) {
    return Math.round((dec * start ** 2 + abs * end ** 2) ** 0.5);
}

function extractChannels(colorStr: string): RGBA | null {
    const x: RGBA = {
        r: 0,
        g: 0,
        b: 0,
        a: -1,
    };

    const length = colorStr.length;

    if (length > 9) {
        const arr = colorStr.split(",");
        const [r, g, b, a] = arr;
        const arrLength = arr.length;

        if (arrLength < 3 || arrLength > 4) {
            return null;
        }

        x.r = parseInt(r[3] == "a" ? r.slice(5) : r.slice(4));
        x.g = parseInt(g);
        x.b = parseInt(b);
        x.a = a ? parseFloat(a) : -1;
    } else {
        if (length == 8 || length == 6 || length < 4) {
            return null;
        }

        let str2 = colorStr;

        if (length < 6) {
            str2 = `# ${colorStr[1]}${colorStr[1]}${colorStr[2]}${colorStr[2]}${colorStr[3]}${colorStr[3]
                }${length > 4 ? colorStr[4] + colorStr[4] : ""}`;
        }

        const dec = parseInt(str2.slice(1), 16);

        if (length == 9 || length == 5) {
            x.r = (dec >> 24) & 255;
            x.g = (dec >> 16) & 255;
            x.b = (dec >> 8) & 255;
            x.a = Math.round((dec & 255) / 0.255) / 1000;
        } else {
            x.r = dec >> 16;
            x.g = (dec >> 8) & 255;
            x.b = dec & 255;
            x.a = -1;
        }
    }

    return x;
}
