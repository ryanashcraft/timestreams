const options = { notation: 'compact' }

export const formatCompact = (val: number): string => {
    if (val < 1000) {
        return `${val}`
    } else {
        return `${(val / 1000).toFixed(1)}K`
    }
}
