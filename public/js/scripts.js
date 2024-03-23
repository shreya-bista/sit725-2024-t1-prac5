const cardList = [
    {
        title: 'Basics of HTML', image: 'images/Image-html.jpeg', link: 'All About HTML', description: 'HTML'
    },

    {
        title: 'Advanced CSS', image: 'images/Image-css.jpeg', link: 'All About CSS', description: 'CSS'
    }
];

const loginButton = () => {
    console.log('loginButton clicked');
}

const addCards = (items) => {
    console.log(items);
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align"> <div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+ item.image +'"></img></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">'+ item.title +'<i class="material-icons right">more_vert</i></span><p><a href="#">View More About This Course</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span><p class="card-text">'+item.description+'</p></div></div></div>';
        $('#card-section').append(itemToAppend);
    });
}


const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.email = $('#email').val();
    formData.password = $('#password').val();

    // Validate email format for the form
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(formData.email)) {
        M.toast({ html: 'Please enter email in valid format, username@example.com', classes: 'red' });
        return; 
    }

    console.log('form data: ', formData);
}


$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.modal').modal();

    addCards(cardList);
    $('#formSubmit').click(()=>{
        submitForm();
    })
});
