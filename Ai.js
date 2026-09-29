import OpenAI  from "openai";

const openai = new OpenAI({
    apiKey:"14758",
    dangerouslyAllowBrowser:true
})


const messages =[
    {
        role: 'system',
        content:'You are a helpful general knowledge expert.'
    },{
        role:'user',
        content:'who invented the television?'
    }

]
const response = await openai.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages: messages
})

console.log(response.choices[0].message.content)