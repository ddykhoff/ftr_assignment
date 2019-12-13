import Histogram from "./Histogram"

export default class FibonacciHistogram extends Histogram {
    fibonacciDictionary: Set<bigint> = new Set<bigint>()

    constructor (firstNFibonacci: number) {
        super()
        this.populateFirstNFibonacci(firstNFibonacci)
    }

    /**
     * Populates set of first N numbers in the Fibonacci sequence
     * Some definitions have F(0) as 0, others as 1. I will use F(0) = 0
     */
    private populateFirstNFibonacci(n: number): void {
        let curFib: bigint = 1n
        let last: bigint = 0n

        for (let i: bigint = 1n; i < n - 1; i++) {
            if (last === 0n) {
                // this is needed to get F(0) = 0, and also why we initialize i = 1n instead of 0n
                this.fibonacciDictionary.add(last)
            }

            const current: bigint = curFib
            curFib += last
            last = current

            this.fibonacciDictionary.add(curFib)
        }
    }
    
    private isFirstNFibonacci(number: number): boolean {
        // Requirement wants to check first 1000 Fibonacci numbers, but since they grow exponentially we 
        // may run into issues explicitly calculating these numbers. So we turn to math...
        return this.fibonacciDictionary.has(BigInt(number))
    }

    public addNumber(number: number): void {
        if (this.isFirstNFibonacci(number)) {
            console.log('FIB')
        }
        super.addNumber(number)
    }
}