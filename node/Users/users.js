const fs = require("fs")
const validator = require("validator")
const chalk = require("chalk")
folderPath = "./data"
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
}
filePath = "./data/users.json"
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8")

}
const loadUsers = () => {
    const fileBuffer = fs.readFileSync(filePath, "utf-8")
    const contacts = JSON.parse(fileBuffer)
    return contacts
}
const saveUsers = (name, age) => {
    const users = loadUsers()
    const user = users.find((user) => user.name == name)
    if (user) {
        console.log(chalk.red("User already exists"))
        return false
    }
    if (!validator.isLength(name, { min: 3 })) {
        console.log(chalk.red("Name must be at least 3 characters"))
        return false
    }

    users.push({ name, age })
    fs.writeFileSync(filePath, JSON.stringify(users), "utf-8")
    console.log("data User tersimpan")
}
const listUsers = () => {
    const users = loadUsers()
    users.forEach((user, i) => {
        console.log(`no ${i+1} : ${user.name}`)
    });
}
const detailUser = (name) => {
    const users = loadUsers()
    const user = users.find((user) => user.name.toLowerCase() == name.toLowerCase())
    if (!user) {
        console.log(chalk.red("User not found"))
        return false
    }
    console.log(chalk.cyan.italic(`name : ${user.name}`))
    console.log(chalk.cyan.bold(`age : ${user.age}`))
}
const removeUser = (name) => {
    const users = loadUsers()
    const newUsers = users.filter(
        (user) => user.name.toLowerCase() !== name.toLowerCase()
    )
    if (users.length === newUsers.length) {
        console.log(chalk.red("User not found"))
    } else {
        fs.writeFileSync(filePath, JSON.stringify(newUsers), 'utf-8')
        console.log(chalk.inverse.bgCyan(`deleted ${name} success `))
    }
}

module.exports = {
    saveUsers,
    listUsers,
    detailUser,
    removeUser



}