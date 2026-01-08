export default defineEventHandler((event) => {
    console.log('hit response')
    return {
        message:  '## Hi From the Server \n\nIt is working!' ,
        buttons: {title: 'button title', action: 'hover'},
        chips: ['yes', 'no']
    }
})