function timeElapsed(now) {
    const start = new Date()
    let start_seconds = Math.round(start/1000)
    let now_seconds = Math.round(now/1000)
    let start_minutes = Math.round(start_seconds/60)
    let now_minutes = Math.round(now_seconds/60)
    let start_hours = Math.round(start_minutes/60)
    let now_hours = Math.round(now_minutes/60)
    let start_days = Math.round(start_hours/24)
    let now_days = Math.round(now_hours/24)
    let start_weeks = Math.round(start_days/24)
    let now_weeks = Math.round(now_days/24)

    if(Math.abs(start_seconds - now_seconds) < 59) {
        return (start_seconds < now_seconds) ? 
        `${Math.abs(start_seconds - now_seconds)} ${(Math.abs(start_seconds - now_seconds) < 2) && (Math.abs(start_seconds - now_seconds) < 2) ? 'just now' : 'seconds ago'}` : 
        `${60-(start_seconds - now_seconds)} ${60-(start_seconds - now_seconds) < 2 ? 'second' : 'seconds'} ago`
    } else if ((now_minutes - start_minutes) < 60) {
        return (start_minutes < now_minutes) ? 
        `${Math.abs(start_minutes - now_minutes)} ${Math.abs(start_minutes - now_minutes) < 2 ? 'minute' : 'minutes'} ago` : 
        `${60-(start_minutes - now_minutes)} ${60-(start_minutes - now_minutes) < 2 ? 'minute' : 'minutes'} ago`
    } else if ((now_hours - start_hours) < 24) {
        return (start_hours < now_hours) ? 
        `${Math.abs(start_hours - now_hours)} ${Math.abs(start_hours - now_hours) < 2 ? 'hour' : 'hours'} ago` : 
        `${24-(start_hours - now_hours)} ${24-(start_hours - now_hours) < 2 ? 'hour' : 'hours'} ago`
    } else if ((now_days - start_days) < 7) {
        return (start_days < now_days) ? 
        `${Math.abs(start_days - now_days)} ${Math.abs(start_days - now_days) < 2 ? 'day' : 'days'} ago` : 
        `${7-(start_days - now_days)} ${7-(start_days - now_days) < 2 ? 'day' : 'days'} ago`
    } else if ((now_weeks - start_weeks) < 5) {
        return (start_weeks < now_weeks) ? 
        `${Math.abs(start_weeks - now_weeks)} ${Math.abs(start_weeks - now_weeks) < 2 ? 'week' : 'weeks'} ago` : 
        `${5-(start_weeks - now_weeks)} ${5-(start_weeks - now_weeks) < 2 ? 'week' : 'weeks'} ago`
    } else if ((now_days - start_days) > 30) {
        return `${(now_days - start_days)%30} ${((now_days - start_days)%30)< 2 ? 'month' : 'months'} ago`
    } else if ((now_days - start_days) > 365) {
        return `${(now_days - start_days)%365} ${((now_days - start_days)%365)< 2 ? 'month' : 'months'} ago`
    } 
}

export default timeElapsed