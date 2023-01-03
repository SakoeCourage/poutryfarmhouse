import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import { Inertia } from "@inertiajs/inertia";
dayjs.extend(relativeTime);


export function diffForHumans(date) {
    if (date) {
        return dayjs(date).fromNow();
    }

}

export function setsort(sortbyvalue) {
    let CurrentRoute = () => location.href.toString()
    Inertia.get(CurrentRoute(), { sort: sortbyvalue }, {
        preserveState: true,
        replace: true
    })
}


export function formatcurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'GHS' }).format(amount)
}

export function dateReformat(date) {
    return (dayjs(date).format('DD/MM/YYYY'))
}

export function removeURLParameter(param, url) {
    url = decodeURI(url).split("?");
    let path = url.length == 1 ? "" : url[1];
    path = path.replace(new RegExp("&?" + param + "\\[\\d*\\]=[\\w]+", "g"), "");
    path = path.replace(new RegExp("&?" + param + "=[\\w]+", "g"), "");
    path = path.replace(/^&/, "");
    return url[0] + (path.length ?
        "?" + path :
        "");
}