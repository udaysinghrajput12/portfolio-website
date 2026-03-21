
const roles = ["Full Stack Developer","JavaScript Developer","Node.js Enthusiast"]

let count=0
let index=0
let currentText=""
let letter=""

function type(){

if(count===roles.length){
count=0
}

currentText=roles[count]
letter=currentText.slice(0,++index)

document.querySelector(".typing").textContent=letter

if(letter.length===currentText.length){
count++
index=0
}

setTimeout(type,150)
}

type()

particlesJS("particles-js",{
particles:{
number:{value:80},
size:{value:3},
move:{speed:2},
line_linked:{enable:true}
}
})


// GitHub projects loader
const username = "udaypratap123"; // CHANGE THIS

fetch(`https://api.github.com/users/${username}/repos`)
.then(res=>res.json())
.then(data=>{

const container=document.getElementById("githubProjects")

data.slice(0,6).forEach(repo=>{

const div=document.createElement("div")
div.className="card glass"

div.innerHTML=`
<h3>${repo.name}</h3>
<p>${repo.description || "GitHub repository"}</p>
<a href="${repo.html_url}" target="_blank">View Repo</a>
`

container.appendChild(div)

})

})
