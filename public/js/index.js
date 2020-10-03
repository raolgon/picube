//Uploader functions

// const uploaderDrop = document.querySelector('#uploaderDropZone')
// const imgContainer = document.querySelector('#imgContainer')
// const formUploader = document.querySelector('form')

// uploaderDrop.addEventListener('dragover', (e) => {
//     e.stopPropagation()
//     e.preventDefault()
//     e.dataTransfer.dropEffect = 'copy'
// })

// uploaderDrop.addEventListener('drop', (e) => {
//     e.stopPropagation()
//     e.preventDefault()
//     const files = e.dataTransfer.files

//     for(let i=0, file; file = files[i]; i++) {
//         if(file.type.match(/image.*/)){
//             let reader = new FileReader()

//             reader.onload = function(e2){
//                 let img = document.createElement('img')
//                 img.src = e2.target.result
//                 imgContainer.appendChild(img)
//             }
//             reader.readAsDataURL(file)
//         }
//     }
// })

// //Upload files from folder

// formUploader.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const files = document.querySelector('[type=file]').files

//     for(let i=0, file; file = files[i]; i++) {
//         if(file.type.match(/image.*/)){
//             let reader = new FileReader()

//             reader.onload = function(e2){
//                 let img = document.createElement('img')
//                 img.src = e2.target.result
//                 imgContainer.appendChild(img)
//             }
//             reader.readAsDataURL(file)
//         }
//     }
// })

// //ProgressBar

// //Trigger upload animation
// const uploadAnimation = () => {
//     const line = new ProgressBar.Line('#progressBar', {
//         strokeWidth: 1.5,
//         easing: 'easeInOut',
//         duration: 1400,
//         color: '#FFEA82',
//         trailColor: '#eee',
//         trailWidth: 1,
//         svgStyle: {width: '100%', height: '100%'}
//     })
//     line.animate(1)
// }

// document.querySelector('#progressBar').addEventListener('click', uploadAnimation())