export const useFormatDatetime = (datetime?: string) => {
    if  (!datetime) return ''
    const date = new Date(datetime)
    return new Intl.DateTimeFormat("ja-jp", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date)
}