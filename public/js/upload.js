document.addEventListener('DOMContentLoaded', ()=>{
    console.log('DOM loaded');
    const form = document.getElementById('upload-form')
    console.log('Form element:', form);
    const messageDiv = document.getElementById('message')
    console.log('Message div:', messageDiv);

    form.addEventListener('submit', async (e)=>{
        e.preventDefault()
        messageDiv.textContent = 'uploading ...'
        const formData  = new FormData(form)
        const fileInput = document.querySelector('input[type="file"]')

        if(!fileInput.files.length){
            messageDiv.textContent = 'Please select a file.'
            console.log('error file input')
            messageDiv.className = 'error-message'
            return
        }
        try{
            const response = await fetch('/upload', {
                method : 'POST',
                body : formData
            })
            const result = await response.json()
            if(result.success){
                messageDiv.textContent = `File uploaded successfully: ${result.filename} (${result.fileSize})`
            }else{
                messageDiv.textContent = `Error : ${result.error}`
            }
        }catch(error){
            messageDiv.textContent = `Error: ${error.message}`
        }

    })
})