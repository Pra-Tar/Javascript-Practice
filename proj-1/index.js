const galaryCotainer = document.querySelector(".gallery")
const loadingContainer = document.querySelector(".loading-indicator")



function fetchImages(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            images=['https://via.placeholder.com/400x300?text=Image(1)','https://via.placeholder.com/400x300?text=Image(2)','https://via.placeholder.com/400x300?text=Image(3)','https://via.placeholder.com/400x300?text=Image(4)','https://via.placeholder.com/400x300?text=Image(5)','https://via.placeholder.com/400x300?text=Image(6)']
            resolve(images)
        },1000)
    })
}

function lazyLoadImages(){
    const image=document.querySelectorAll('.loading')
    console.log(image)

    const observer=new IntersectionObserver((entry,observe)=>{
        entry.forEach((e)=>{
            if(e.isIntersecting){
                console.log(e.target)
                const img=e.target
                img.src=img.dataset.src
                img.classList.remove('loading')
                observe.unobserve(img)
            }
        })
    })

    image.forEach((i)=>{
        console.log(i)
        observer.observe(i)
    })

}


function loadImages(){
    loadingContainer.style.display='block'

    fetchImages().then((images)=>{
        images.forEach((url)=>{
            const imgElement = document.createElement('img')
            imgElement.dataset.src=url
            imgElement.classList.add('loading')         // add a class-loading for each img element 
            galaryCotainer.appendChild(imgElement)
        })
        loadingContainer.style.display='none'
        lazyLoadImages();
    })

 
}



// for infinite scrolling 
window.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100){
        console.log('Hi')
        loadImages()    
    }
})
// initial loading of images 
loadImages()