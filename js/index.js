//Uploader functions

const uploaderDrop = document.querySelector('#uploaderDropZone')
const imgContainer = document.querySelector('#imgContainer')

uploaderDrop.addEventListener('dragover', (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
})

uploaderDrop.addEventListener('drop', (e) => {
    e.stopPropagation()
    e.preventDefault()
    const files = e.dataTransfer.files

    for(let i=0, file; file = files[i]; i++) {
        if(file.type.match(/image.*/)){
            let reader = new FileReader()

            reader.onload = function(e2){
                let img = document.createElement('img')
                img.src = e2.target.result
                imgContainer.appendChild(img)
            }
            reader.readAsDataURL(file)
        }
    }
})

