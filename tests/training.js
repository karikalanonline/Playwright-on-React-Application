// class person {
//     age = 25;
//     get location() {
//         return 'canada'
//     }
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//     fullName() {
//         console.log(this.firstName + this.lastName)
//     }
// }
// let person1 = new person('Tim', 'joe')
// console.log(person1.fullName())
// console.log(person1.location)       //need to ask y undefined

//need to ask
let greet = 'Evening'
greet = 'night'
if (1 == 1) {
    let greet = 'Afternoon'
}
function add(x, y) {
    let greet = 'morning'
    return x + y
}
console.log(add(2, 3))
console.log(greet)