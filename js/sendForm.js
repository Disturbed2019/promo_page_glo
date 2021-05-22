const server = 'https://jsonplaceholder.typicode.com/posts';
const sendData = (data, callback, falseCallback) => {
    const request = new XMLHttpRequest();
    request.open('POST', server);
    request.addEventListener('readystatechange',()=>{
       if (request.readyState !== 4) return;
       if (request.status === 200 || request.status === 201 ){
           const response = JSON.parse(request.responseText);
           callback(response.id);
       } else {
           falseCallback(request.status);
           throw new Error(request.status);
       }
    });
    request.send(data)
};

const formElems = document.querySelectorAll('.form');

const formHandler = (form) => {
    const smallElem = document.createElement('small');
    form.append(smallElem);
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        const data = {};
        let flag = true;
        const buttonSubmit = form.querySelector('.button[type="submit"]');
        for (const elem of form.elements){
            const {name, value} = elem;
            if (name ){
                if (value.trim()){
                    elem.style.border= '';
                    data[name] = value;
                } else {
                    elem.style.border= '1px solid red';
                    flag = false;
                    elem.value='';
                }
            }
        }
        if (!flag){
            return smallElem.textContent = 'Заполните поля!'
        }

        sendData(JSON.stringify(data),
        (id)=>{
            smallElem.textContent = 'Ваша заявка №'+ id +
                '!\nМы скоро с вами свяжемся!';
            smallElem.style.color = 'green';
            buttonSubmit.disabled = true;

            setTimeout(() => {
                smallElem.textContent = '';
                buttonSubmit.disabled = false;
            },5000)
        },
        (err) =>{
            smallElem.textContent = 'На сайте технические работы';
            smallElem.style.color = 'red';
        });
        form.reset();
    })
};

formElems.forEach(formHandler);
