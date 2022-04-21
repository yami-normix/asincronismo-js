//Algo va a pasar
const somethingWillHappen = () => {
//Retornará una nueva promesa
    return new Promise((resolve, reject) => {
        if(true) {
            resolve("Heyyyy");
        } else {
            reject ("Whoopzzz!!!!");
        }
    });
};

somethingWillHappen()
.then(response => console.log (response))
.catch(err => console.error(err));

const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if(true) {
            setTimeout(() => {
                resolve("True")
            }, 2000)
        }else {
            const error = new Error("Whoooppzzzz!!!");
            reject(error);
        }
    })

}
somethingWillHappen2()
.then(response => console.log(response))
.catch(err => console.error(err))

//Promesas encadenadas
Promise.all([somethingWillHappen(), somethingWillHappen2()])
.then(response => {
    console.log("Array of results", response);
})
.catch(err => {
    console.error(err);
})