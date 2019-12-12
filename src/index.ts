import { createInterface, Interface } from 'readline'

const rl: Interface = createInterface({
  input: process.stdin,
  output: process.stdout
})

let data: { [ key: string ]: number } = {}

setInterval(() => {
    console.log(`This is your data: ${JSON.stringify(data)}`)
},  250)

rl.question('Whats the next number?', (answer: string) => {
    const cleanAnswer: string = answer.trim()
    const number: number = Number(cleanAnswer)
    if (!isNaN(number)) {
        if (!Object.keys(data).includes(cleanAnswer)) {
            data[cleanAnswer] = 0
        }
        data[cleanAnswer]++
    } else {
        console.error('Please provide a number.')
    }
})
