const yargs = require("yargs")
const users = require("./users")
yargs.command({
    command: 'add',
    describe: 'add new user',
    builder: {
        name: {
            describe: 'user name',
            demandOption: true,
            type: 'string'
        },
        age: {
            describe: 'user age',
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv) => {
        users.saveUsers(argv.name, argv.age)
    }
}).demandCommand()

yargs.command({
    command: 'list',
    describe: 'list all user',
    handler: () => {
        users.listUsers()
    }
})
yargs.command({
    command: "detail",
    describe: "detail user",
    builder: {
        name: {
            describe: "user name",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        users.detailUser(argv.name)
    }


})

yargs.command({
    command: 'remove',
    describe: 'remove user',
    builder: {
        name: {
            describe: 'user name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        users.removeUser(argv.name)
    }
})
yargs.parse()