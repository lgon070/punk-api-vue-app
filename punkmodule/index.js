const superagent = require('superagent')
const config = require('./config.json')
const clc = require('cli-color')

async function search (query) {
    const url = `${config.searchUrl}${query}`
    //console.log(url)
    try{
        const response = await superagent.get(url)
        const filterResponses = _filter(response.body)
        return filterResponses
    }
    catch(error){
        console.log(clc.red(`Something went wrong. Could not search for ${query} in Punk API`))
    }

}

async function fetch (beverageID){
    const url = `${config.fetchUrl}${beverageID}`
    //console.log(url)
    try{
        const response = await superagent.get(url)
        return response.body
    }
    catch(error){
        console.log(clc.red(`Something went wrong. Could not fetch for Beverage ID: ${beverageID} in Punk API`))
    }
}

function _filter (array) {
    if(array.length > 10){
        return array.slice(0, 10)
    }
    else{
        return array
    }
}

module.exports={
    search,
    fetch
}