export default class Histogram {
    private data: { [ key: string ]: number } = {}

    /**
     * Determine if the histogram data has any elements (i.e. is empty)
     */
    public isEmpty(): boolean {
        return Object.keys(this.data).length === 0;
    }

    /**
     * Adds number to the Histogram data
     */
    public addNumber(number: number): void {
        // get a string representation to use in map
        const key = number.toString()

        if (!Object.keys(this.data).includes(key)) {
            this.data[key] = 0
        }
        this.data[key]++
    }

    /**
     * Gets the histogram data in an ordered array
     */
    public getSortedData(): [string, number][] {
        // convert the histogram mapping to an ordered array of entries
        const dataArray: [string, number][] = Object.entries(this.data)

        // each entry is an array of length two with the key as element [0] and the value as element [1]
        // so we can sort the entries by comparing the elements at index 1
        const sortedData: [string, number][] = dataArray.sort((a: [string, number], b: [string, number]) => {
            return b[1] - a[1]
        })
        
        return sortedData
    }
    
}