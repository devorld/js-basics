const ID_SPACE = '\u3000';

function getGraphemeCount(str) {
    const segmenter = new Intl.Segmenter("en-US", {granularity: "grapheme"});

    // from \x1b[0m to \x1b[100m
    const ansiColorRegEx = /\x1b\[\d+m/gi;

    return [...segmenter.segment(str.replaceAll(ansiColorRegEx, ''))].length;
}

export {ID_SPACE, getGraphemeCount};
