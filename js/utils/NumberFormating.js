
function exponentialFormat(num, precision, mantissa = true) {
    var exp = num.log10().floor()
    var man = num.div(EN.pow(10, exp))
    return man.toFixed(precision) + "e" + commaFormat(exp)
}

function commaFormat(num, precision) {
    if (num === null || num === undefined || isNaN(num)) return "NaN"

	let exp = Math.floor(Math.log10(num))
	let mant = num / Math.pow(10, exp)

    if (num < 0.001) return 0
    if (num > 1e12) return format(num)
    return Math.floor(num).toFixed(Math.max(Math.min(precision, 6 - exp), 0)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function formatSmall(x, precision = 2) { 
    return format(x, precision, true)
}

function regularFormat(num, precision) {
    if (num === null || num === undefined || isNaN(num)) return "NaN"

	let exp = Math.floor(Math.log10(num))
	let mant = num / Math.pow(10, exp)

    if (num < 0.001) return (0).toFixed(precision)
    if (num >= 1e9) return format(num)
    return num.toFixed(Math.max(Math.min(precision, 6 - exp), 0))
}

function fixValue(x, y = 0) {
    return x || EN(y)
}

function sumValues(x) {
    x = Object.values(x)
    if (!x[0]) return EN(0)
    return x.reduce((a, b) => ExpantaNum.add(a, b))
}

function format(decimal, precision = 2, small = false) {
    small = small || modInfo.allowSmall
    decimal = new EN(decimal)
    if (decimal.array[0] === null || !decimal.isFinite()) return decimal.toString()

	let exp = decimal.array[0] || 0
	let layer = decimal.array[1] || 0
	let pent = decimal.array[2] || 0
	let hex = 0

	let r = ""

	if (exp >= 1e9) {
		exp = Math.log10(exp)
		layer++
	}
	if (layer >= 10) {
		exp = layer + EN.slog(exp, 10).toNumber()
		layer = 0
		pent++
	}

	//Pentation
	if (pent > 0) {
		r += "F".repeat(pent - 1)
		if (layer == 0) {
			var expLayer = Math.floor(Math.log10(exp))
			var mantLayer = Math.pow(10, exp - Math.floor(exp))
			r += (expLayer < 4 ? mantLayer.toFixed(3 - expLayer) : "") + "F"
		} else r += "F"
	}

	//Tetration and exponentiation
	if (layer == 0) r += commaFormat(exp)
	else {
		var expExp = Math.floor(Math.log10(exp))
		var mantExp = Math.pow(10, exp - Math.floor(exp))
		r += ("e").repeat(layer - 1) + (expExp < 4 ? mantExp.toFixed(3 - expExp) : "") + "e" + commaFormat(exp)
	}
	return r
}

function superscript(value) {
    if (player.inlineExp) return "^" + value
    return swapChars(value, "0123456789,", "⁰¹²³⁴⁵⁶⁷⁸⁹’")
}

function swapChars(value, start, end) {
    for (var a = 0; a < start.length; a++)
        value = value.replaceAll(start[a], end[a])
    return value
}

function formatWhole(decimal) {
    return format(decimal,0)
}

function formatTime(s) {
    if (s > 31536000000 || (s.gt && s.gt(31536000000))) return format(EN(s).div(31536000)) + " years"
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 84600) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return formatWhole(Math.floor(s / 84600) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 84600) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}

function toPlaces(x, precision, maxAccepted) {
    x = EN(x)
    let result = x.toString(precision)
    if (EN(result).gte(maxAccepted)) {
        result = EN(maxAccepted - Math.pow(0.1, precision)).toString(precision)
    }
    return result
}
