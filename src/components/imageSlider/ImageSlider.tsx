

export const ImageSlider=(images:string[])=>{
        let slideNumber=0
        const totalSlides=images.length
        if (slideNumber===totalSlides){
            slideNumber=0
        }else{
            slideNumber++
        }
        console.log(images)
    return(images[slideNumber])
}