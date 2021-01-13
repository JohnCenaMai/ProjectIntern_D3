export default function(arr) {
    const stringArr = JSON.stringify(arr);

    const stringJson = stringArr.slice(1, stringArr.length - 1);

    return JSON.parse(stringJson);
}