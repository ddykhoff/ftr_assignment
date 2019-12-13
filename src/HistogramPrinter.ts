import Histogram from "./Histogram";

export default class HistogramPrinter {
    private histogram: Histogram
    private printRate: number
    
    private startTime: Date
    private pauseRemainder: number = 0
    private interval: NodeJS.Timeout

    /**
     * Constructor of the HistogramPrinter class
     * 
     * @param histogram - Histogram object where data is stored
     * @param interval  - number of seconds of desired printing interval
     */
    constructor(histogram: Histogram, interval: number) {
        this.histogram = histogram
        this.printRate = interval * 1000 // convert to ms used by setInterval
    }
    
    /**
     * Prepares a string for displaying the Histogram data
     * 
     * @param data - Histogram data in entry-array format
     */
    private formatDataForPrinting(data: [string, number][] ): string {
        return data.map((entry: [string, number]) => {
            return entry.join(':')
        }).join(', ')
    }

    /**
     * Prints the sorted histogram data
     */
    public printOnce(): void {
        if (!this.histogram.isEmpty())
        console.log('\n' + this.formatDataForPrinting(this.histogram.getSortedData()))
    }

    /**
     * Starts the initial printering interval. Also handles resuming interval if it was paused.
     */
    public startPrinting(): void {
        console.log(`Waiting ${this.pauseRemainder} ms to start again`)
        this.interval = setTimeout(() => {
            if (this.pauseRemainder > 0) {
                // print once after timeout from pause remainder
                // not necessary when there was no remainder because we expect a delay of printRate at startup
                this.printOnce()
            }

            // reset remainder since we already waited on it
            this.startTime = new Date()
            this.pauseRemainder = 0

            // resume the interval printing
            this.interval = setInterval(() => {
                this.startTime = new Date()
                this.printOnce()
            }, this.printRate)
        }, this.pauseRemainder)
    }

    /**
     * Pauses the printing interval. Stores time remaining on current interval until next execution was scheduled
     * for resuming later.
     */
    public stopPrinting(): void {
        // check we aren't already paused, remainder would be nonzero if paused
        if (this.pauseRemainder === 0) {
            // there may be a bug here due to this.startTime not accounting for the time elapsed while the timer is
            // unpaused, but paused again before a display occurs. not sure if this behavior goes against the 
            // requirements or not, so I will leave it
            const timeElapsed = new Date().getTime() - this.startTime.getTime()
            this.pauseRemainder = this.printRate - timeElapsed // time remaining until interval would have been executed again
        }
        clearInterval(this.interval)
    }
}