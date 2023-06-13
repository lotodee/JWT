# JWT


<%- include('partials/header'); -%>

<form>
    <h2>Sign Up</h2>
    <label for="email">Email</label>
    <input type="text" name="email"/>
    <div class="email error"></div>
    <label for="password">Password</label>
    <input type="password" name="password" required/>
    <div class="password error"></div>
    <button>Submit</button>
</form>

<script>
    const form = document.querySelector('form')
     const emailError = document.querySelector('.email.error')
     const passwordError = document.querySelector('.password.error')
    form.addEventListener('submit' , async(e)=>{
        e.preventDefault()
        //get values
        const email = form.email.value
        const password = form.password.value
        

        //reset errors
        emailError.textContent = ''
        passwordError.textContent = ''
     
console.log(email,password)
        try{

            const res = await fetch('/signup' , {
 
                method:'POST',
                body:JSON.stringify({email , password}),
                headers:{'Content-Type' : 'application/json'}
 
            });
  const data = await res.json()
if(data.errors){
    emailError.textContent = data.errors.email
    passwordError.textContent = data.errors.password
    
}

if(data.user){


    location.assign('/login' )
    
}
 
        }catch(err){
            console.log(err)
        }
    })
</script>

<%- include('partials/footer'); -%>