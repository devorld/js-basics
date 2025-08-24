function getGraphemeCount(str) {
    const segmenter = new Intl.Segmenter("en-US", { granularity: "grapheme" });

    return [...segmenter.segment(str)].length;
}

export { getGraphemeCount };
