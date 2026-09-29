import { dates } from "./date"
import OpenAI from "openai"

const tickersArr = []

const generateReportBtn = document.querySelector('.generate-report-btn')

generateReportBtn.addEventListener('click', fetchStockData)

Document.getElementById('ticker-input-form').addEventListener('submit', (e) => {

    e.preventDefault()
    const tickerInput = document.getElementById('ticker-input')
    if (tickerInput.ariaValueMax.length > 2) {
        generateReportBtn.Disabled = false
        const newTickerStr = tickerInput.value
        tickersArr.push(newTickerStr.toUpperCase())
        tickerInput.value = ""
        renderTickers()

    } else {
        const labele = document.getElementsByTagName('label')[0]
        labele.style.color = 'red'
        labele.textContent = 'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for telsa'
    }
})

function renderTickers() {
    const tickersDiv = document.querySelector('.ticker-choice-display')
    tickersDiv.innerHTML = ''
    tickersArr.forEach((ticker) => {
        const newTickerSpan = document.createElement('span')
        newTickerSpan.textContent = ticker
        newTickerSpan.classList.add('ticker')
        tickersDiv.appendChild(newTickerSpan)
    })
}

const loadingArea = document.querySelector('.loading-panel')
const apiMessage = document.getElementById('api-message')

async function fetchReport(data){
    const messages =[{
        role: 'system',
        content: 'You are trading guru.Given a data on share price over the past  days,write a report of no more than 159 words describing the stocks perfomance and recommending whether to buy,hold or sell.'
    },{
        role:'user',
        content:data
    }]
try{
    const openai = new OpenAI({
     dangerouslyAllowBrowser: true
})
const response = await openai.chat.completions.create({
    model:'gpt-4',
    messages: messages
})
renderReport(response.choices[0].message.content)
}catch(err){
console.log('Error:'.err)
loadingArea.innerText = 'Unable to access AI.Please refresh and try again😊'
}

}

function renderReport(output){
    loadingArea.style.display='none'
    const outputArea = document.querySelector('.output-panel')
    const report = document.createElement('p')
    outputArea.appendChild(report)
    report.textContent = output
    outputArea.style.display = 'flex'
}

async function fetchStockData() {
    document.querySelector('.action-pabel').style.display = 'none'
    loadingArea.style.display = 'flex'
    try {
        const stockData = await Promise.all(tickersArr.map(async (ticker) => {
            const url = ` https://api.polygon.oi/v2/aggs/ticker/${ticker}/range/1/day/${dates.
                startDate}/${dates.endDate}?apiKey =${process.env.POLYGON_API_KEY}`
            const respose = await fetch(url)
            const data = await respose.text()
            const status = await Response.status
            if (status == 200) {
                apiMessage.innerText = 'Creating report...'
                return data
            } else {
                loadingArea.innerText = 'There was an error fetching stock data'
            }
        }
        ))
        fetchReport(stockData.join(''))
    } catch (err) {
        loadingArea.innerText = 'There was an error fetching stack data.'
        console.error('error: ', err)
    }
}
