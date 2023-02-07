/// https://github.com/ye-kyaw-thu/sylbreak/blob/master/Javascript/resegment.js
const myConsonant = "\u1000-\u1021"; // "က-အ"

const enChar = "a-zA-Z0-9";

// "ဣဤဥဦဧဩဪဿ၌၍၏၀-၉၊။!-/:-@[-`{-~\s"
const otherChar = "\u1023\u1024\u1025\u1026\u1027\u1029\u102a\u103f\u104c\u104d\u104f\u1040-\u1049\u104a\u104b!-/:-@\\[-`\\{-~\\s";

const ssSymbol = "\u1039";

const ngaThat = "\u1004\u103a";

const aThat = "\u103a";

// Regular expression pattern for Myanmar syllable breaking
// *** a consonant not after a subscript symbol AND a consonant is not
// followed by a-That character or a subscript symbol
const BREAK_PATTERN = new RegExp("((?!" + ssSymbol + ")[" + myConsonant + "](?![" + aThat + ssSymbol + "])" + "|[" + enChar + otherChar + "])", "mg");

function segment(text) {
	var outArray = text.replace(BREAK_PATTERN, "𝕊$1").split('𝕊')
	if (outArray.length > 0) {
		outArray.shift();
		//out.splice(0, 1);
	}
	return outArray;
}

function segmentWithSeparator(text, separator) {
	if (separator === undefined) {
		separator = "|";
	}
	var result = text.replace(BREAK_PATTERN, separator + "$1");
    result = result.replace("\u{1039}","\u{103A}");
    return result;
}

//-------//


var fs = require('fs');
var content = fs.readFileSync("word.tsv", "utf8")
var map = {};
var enmap = {};
const json = content.split('\n')
    .map(profile => {
        const [eng, mya] = profile.split('\t');
        map[mya] = eng
        enmap[eng] = mya
        return { eng, mya };
    });

var input = "သေနာကောင်သေးသေးလေး"
var data = segmentWithSeparator(input," ")
console.log(data);
data = data.substr(1)
var res = "";
data.split(" ").map(seg => {
    if(map[seg] != null) {
        res = res + " " + map[seg]   
    }
    else {
        res = res + " " + seg
    }
    return seg
});

console.log(res)


input = "lin naing aung"
var res = "";
input.split(" ").map(seg => {
    if(enmap[seg] != null) {
        res = res + " " + enmap[seg]   
    }
    else {
        res = res + " " + seg
    }
    return seg
});

console.log(res)