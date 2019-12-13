import { createInterface, Interface } from 'readline'
import { sanitizeNumericalInput } from './util'
import Histogram from './Histogram'
import FibonacciHistogram from './FibonacciHistogram'
import HistogramPrinter from './HistogramPrinter'

const FIRST_N_FIBONACCI = 1000

const rl: Interface = createInterface({
  input: process.stdin,
  output: process.stdout
})

const histogram: Histogram = new FibonacciHistogram(FIRST_N_FIBONACCI)
let printer: HistogramPrinter

// first we ask for the user to provide the output interval
const getPrintInterval = (): void => {
    rl.question('Provide the histogram output interval (sec): ', (answer: string) => {
        try {
            // clean input and cast to number
            const numberAnswer = sanitizeNumericalInput(answer)

            // check interval validity
            if (numberAnswer <= 0) {
                console.log('Please provide a valid interval (non-zero positive number).')
                getPrintInterval()
            }
    
            // setup printer with provided interval
            printer = new HistogramPrinter(histogram, numberAnswer)
            printer.startPrinting()
    
            // after printer is set up, we start our feedback loop which always prompts for the next data input
            inputLoop()
        } catch (e) {
            console.log(e.message)

            // ask again if user input malformed number
            getPrintInterval()
        }
    })
}

const inputLoop = (): void => {
    // we also need to handle the 'halt', 'resume', and 'quit' options here

    const qualifier: string = histogram.isEmpty() ? 'first' : 'next'
    rl.question(`Whats the ${qualifier} number? `, (answer: string) => {
        try {
            // this will throw error on non-numerical inputs, we handle alternate commands in catch block
            const numberAnswer: number = sanitizeNumericalInput(answer)
            histogram.addNumber(numberAnswer)

            // reprompt for more data
            inputLoop()
        } catch (e) {
            if (answer === 'halt') {
                console.log('Pausing the data output...')
                printer.stopPrinting()
            } else if (answer === 'resume') {
                console.log('Resuming the data output!')
                printer.startPrinting()
            } else if (answer === 'quit') {
                printer.printOnce()
                console.log('C-ya!')
                process.exit()
            } else {
                console.log(e.message)
            }

            // reprompt for more data unless the user quit
            if (answer !== 'quit') {
                inputLoop()
            }
        }
    })
}

getPrintInterval()
