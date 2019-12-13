export function sanitizeNumericalInput (input: string): number {
    const cleanAnswer: string = input.trim()
    const number: number = Number(cleanAnswer)
    
    if (isNaN(number) || cleanAnswer === '') {
        throw new Error(`'${input}' is not a number`)
    }

    return number
}