
addMember = document.querySelector("button.add")
addMember.addEventListener('click', addHouseHoldMember)
familyMembers = []
houseHoldMembers = document.getElementsByTagName("ol")[0]
let memberAgeDiv = document.querySelector("input[name=age]")

function addHouseHoldMember(e) {
    e.preventDefault()
    // console.log(document.querySelector("input[name=age]").value)
    // let memberAgeDiv = document.querySelector("input[name=age]")
    memberAgeValue = memberAgeDiv.value
    // console.log(document.querySelector("select[name=rel]").value)
    let memberRelationship = document.querySelector("select[name=rel]")
    let memberRelationshipValue = memberRelationship.value
    let memberRelationshipCapValue = memberRelationshipValue.charAt(0).toUpperCase() + memberRelationshipValue.slice(1)
    // console.log(document.querySelector("input[name=smoker]").value)
    let memberSmoker = document.querySelector("input[name=smoker]")
    let memberSmokerValue = memberSmoker.checked
    let memberIsSmoker = memberSmokerValue ? "Smoker" : "Non-Smoker"
    // console.log(memberIsSmoker)
    // debugger
    validate(memberAgeValue, memberRelationshipCapValue, memberIsSmoker)
}

function validate(memberAge, memberRelationship, memberIsSmoker) {
    if (memberAgeValue <= 0 || parseInt(memberAge) == NaN) {
        alert("Please Input A Valid Age (Greater Than 0)")
    } else if (memberRelationship === "") {
        alert("Please Choose Relationship")
    } else {
        // familyMembers.push({age: memberAge, relationship: memberRelationship, smoker: memberIsSmoker, included: true})
        familyMembers.push({age: memberAge, relationship: memberRelationship, smoker: memberIsSmoker})
        // console.log(familyMembers)
    
        // console.log(memberAge.parentNode.parentNode.parentNode)
        // debugger
        let form = memberAgeDiv.parentNode.parentNode.parentNode
        form.reset()
        
        showFamilyMembers(memberAge, memberRelationship, memberIsSmoker)
    }
}

function showFamilyMembers(age, relationship, smoker) {
    // console.log("showFamilyMembers", familyMembers, houseHoldMembers)
        let element = document.createElement("li")
        // debugger
        element.setAttribute("id", familyMembers.length)
        let button = document.createElement("button")
        button.setAttribute("class", "delete-button")
        button.setAttribute("id", familyMembers.length)
        button.appendChild(document.createTextNode("Delete"))
       
        element.appendChild(document.createTextNode(`${age}, ${relationship}, ${smoker} `))
        element.appendChild(button)
        // debugger
        deleteButton = element.querySelector("button.delete-button")
        deleteButton.addEventListener('click', deleteMember)
       houseHoldMembers.appendChild(element)
    // })
}

function deleteMember(e) {
    // debugger
    // console.log(deleteButton.parentNode, deleteButton.parentNode.parentNode)
    console.log(e.target.parentNode.id)
    // debugger
    // let indexofArray = parseInt(deleteButton.parentElement.id)
    // console.log(indexofArray)
    
    let liId = parseInt(e.target.parentNode.id) - 1
    // let familyMember = familyMembers[liId - 1]
    // debugger
    // console.log(familyMembers
    // familyMembers.splice(liId, 1)
    console.log(familyMembers[liId], familyMembers[liId].included)
    familyMembers[liId].included = false
    e.target.parentNode.remove()

    // console.log(familyMembers)
}

submitFamily = document.querySelector('button[type="submit"]')
submitFamily.addEventListener('click', serialize)

function serialize(e) {
    e.preventDefault()
    let household = document.querySelector("ol.household")
    newHouseHoldArray = []

    for (let i = 0; i < household.children.length; i++) {
        member = household.children[i].textContent.split(", ")

        memberObj = {};
        memberObj.age = parseInt(member[0])
        memberObj.relationship = member[1]
        // debugger
        memberObj.smoker = member[2].split(' ')[0];

        newHouseHoldArray.push(memberObj);
    }

    let debug = document.querySelector("pre.debug")
    debug.style.display = "block"
    debug.textContent = JSON.stringify(newHouseHoldArray, null, 2)
}