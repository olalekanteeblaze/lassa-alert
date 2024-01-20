export const pad = (num: number)  => {
    return ("0"+num).slice(-2);
}

export const toMinutesSeconds = (secs) => {
    let minutes = Math.floor(secs / 60);
    secs = secs % 60;
    minutes = minutes%60;
    return `${pad(minutes)}:${pad(secs)}`;
}