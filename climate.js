const cityform=document.querySelector(".cityform")
const cityinput=document.getElementById("inputcity")
const card=document.querySelector(".card")
const apikey="18d5ba384d0ede34435780b34b78134c"
cityform.addEventListener("submit",async event =>{
    event.preventDefault()
    const city=cityinput.value 
    if(city){
        try{
            const weatherdata=await getweatherdata(city)
            weatherdisplayinfo(weatherdata)

        }
        catch(error){
            console.error(error)
            errordisplay(error)
        }

    }
    else{
        errordisplay("please!Enter a City.")
    }
})
async function getweatherdata(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response=await fetch(apiurl) 
    if(!response.ok){
        throw new Error("couldn't fetch weather data")
    }
    return await response.json()
}
function weatherdisplayinfo(data){
    console.log(data)
    const{name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data  

        card.textContent=" "
        card.style.display="flex"

        const citydisplay=document.createElement("h1")
        const tempdisplay=document.createElement("p")
        const humiditydisplay=document.createElement("p")
        const desdisplay=document.createElement("p")
        const emojidisplay=document.createElement("p")

        citydisplay.classList.add("cityname")
        tempdisplay.classList.add("tempdisplay")
        humiditydisplay.classList.add("humiditydisplay")
        desdisplay.classList.add("desdisplay")
        emojidisplay.classList.add("emojidisplay")

        citydisplay.textContent=city
        tempdisplay.textContent=`${(temp-273).toFixed(1)}℃`
        humiditydisplay.textContent=`HUMIDITY:${humidity}%`
        desdisplay.textContent=description
        emojidisplay.textContent=displayemoji(id)

        card.appendChild(citydisplay)
        card.appendChild(tempdisplay)
        card.appendChild(humiditydisplay)
        card.appendChild(desdisplay)
        card.appendChild(emojidisplay)

}
function displayemoji(weatherid){

    switch(true){
        case(weatherid>=200 && weatherid <300):
        return "🌩️"
        case(weatherid>=300 && weatherid<400):
        return "🌦️"
        case(weatherid>=500&&weatherid<600):
        return"🌧️"
        case(weatherid>=600&&weatherid<700):
        return"❄️"
        case(weatherid>=700&&weatherid<800):
        return"🌪️"
        case(weatherid===800):
        return"🌤️"
        case(weatherid>=800 && weatherid<810):
        return"☁️"
        default:
            return"❓"
    }
}
function errordisplay(message){
    const errordis=document.createElement("p")
    errordis.textContent=message
    errordis.classList.add("errordisplay")

    card.textContent= ""
    card.style.display ="flex"
    card.appendChild(errordis)
    
    

}
 