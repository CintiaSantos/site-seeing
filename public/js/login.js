$("document").ready(function(){

    $("submit").on("click", function(){
        var user =
        {
            email: $("#email-input").val().trim(),
            password: $("#password-input").val().trim()
        },
        
        function login(email, password){
            $.post("./api/login", {
                email: email,
                password: password
            }).then(function(data){
                window.location.replace(data);
            })
        }
        
    })

})

