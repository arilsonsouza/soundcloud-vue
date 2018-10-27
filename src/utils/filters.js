export function secondsToTime(secs){
    if (!secs) {
        return '00:00';
      }

     const m = Math.floor(secs / 60000)
     const s = ((secs % 60000) / 1000).toFixed(0)

     return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`
}

export function  numberFormat(number) {
    return new Intl.NumberFormat('pt-BR').format(number)
}