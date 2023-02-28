export async function parseGetParams() {
    var query = location.search.substr(1);
    if (query === "") {
        return "";
    } else {
        var params = query.split("&");
        var result = {};
        for (var i = 0; i < params.length; i++) {
            var item = params[i].split("=");

            const key = item[0].replace(/\[|\]/g, '')
            const value = item[1].toLowerCase();

            if (!result[key]) result[key] = [value]
            else result[key].push(value)
        }
        return await result;
    }
}
export function concat(line="", arr = [""]) {
    for (let i = 0; i < arr.length; i++) {
        line += `/${arr[i]}`;
    }
    return line
}
export async function sendRequest(methodString="GET", params=[""]) {
    const link = concat("http://localhost:8080", params);
    const response = await fetch(link, {
        method: methodString,
        headers: {
            'Accept': 'application/json',
        }
    });
    return await response.json();
}
export function reloadToAddressLine(line = "") {
    history.pushState(null, null, line);
    location.reload();
}