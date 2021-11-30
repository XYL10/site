const pn = ()=> {return Math.random()>0.5 ? 1:-1}
window.onload=()=>{

    const wheel = document.querySelector('#wheelG')
    const big = document.querySelector('#bigWheel')
    const bgImg = document.querySelector('#bgImg')
    const small = document.querySelector('#smallWheel')
    const disc1 = document.querySelector('#disc1')
    const disc2 = document.querySelector('#disc2')
    const desc = document.querySelector('#desc')
    
    let a = 0
    let smallState = {play:true,val:0}
    let bigState = {play:true,val:0}

    setTimeout(() => {
        desc.classList.add('desc-hide')
    }, 10000);

    

    function animate(){
        a++
        if(smallState.play) small.style.transform = `rotate(${a}deg)`
        if(bigState.play) big.style.transform = `rotate(${-a}deg)`

        const ang = big.style.transform.replace(/[^0-9]/ig,"");
        // disc1.innerHTML = a%360

        // console.log(a/2%360);
        requestAnimationFrame(animate)
    }

    animate()

    let step = 0 
    let bigType,bigNum, smType
    wheel.addEventListener('click',()=>{
        let ang = big.style.transform.replace(/[^0-9]/ig,"");
        let ang2 = small.style.transform.replace(/[^0-9]/ig,"");
        bgImg.style.opacity -= 0.3
        desc.classList.add('desc-hide')
        switch (step){
            case 0:
                bigState.play = false
                bigNum =  Math.floor(a%360/30)
                bigType =  Math.floor(a%360/120)+1
                
                // disc1.innerHTML =bigType + ',' + bigNum
                disc1.classList.toggle('disc-hide')
                big.style.opacity = 0.5
                break;
            case 1:
                smallState.play = false
                const type = Math.floor(ang2%360/120)
                switch(type){
                    case 0:
                        smType = 2;
                        break;
                    case 1:
                        smType = 3;
                        break;
                    case 2:
                        smType = 1;
                        break;
                }
                // disc2.innerHTML = smType
                disc2.classList.toggle('disc-hide')
                small.style.opacity = 0.5
                setTimeout(() => {
                    tagsShow(bigType,bigNum,smType)
                    document.querySelector('#infoShow').classList.toggle('disc-hide')
                }, 2000);
                break;
            // case 2:
            //     console.log(bigType);
            //     tagsShow(bigType,bigNum,smType)
            //     break;
        }
        step++
        // console.log(step);
    })


    function tagsShow(bigType,bigNum,smType){
        const tagsBox = document.querySelector('#tagsBox')
        const title = document.querySelector('#title')
        const selected = bigNum*3+smType-1
        
        // switch()
        // title.innerHTML = `${bigType} & ${smType}`
        tagsBox.style.display = 'flex'

        for(let i=0;i<36;i++){
            const tag = document.createElement('p')
            tag.className = 'tag'
            tag.innerHTML = ''
            for(let ele=0;ele<10;ele++){
                makeTagElement(tag,Math.floor(i/6),smType)
            }
            const tagTitle = document.createElement('div')
            tagTitle.classList.add('tag-head')
            for(let i2=0;i2<Math.floor(i/3)+1;i2++){
                const span = document.createElement('div')
                
                tagTitle.appendChild(span)
            }
            const tagTitleSub = document.createElement('div')
            tagTitleSub.classList.add('tag-head-sub')
            for(let i2=0;i2<i%3+1;i2++){
                const span = document.createElement('div')
                tagTitleSub.appendChild(span)
            }
            tagTitle.appendChild(tagTitleSub)
            
            tag.appendChild(tagTitle)
            tagsBox.appendChild(tag)

            
            if(i==selected){
                tag.classList.add('luck-tag')
                tag.addEventListener('click',()=>{
                    
                    // [].filter.call(tag.parentElement.children,el => el !== tag).forEach(el => el.classList.remove('active'));
                    document.querySelectorAll('.tag-colored-ele').forEach(ele=>ele.remove())
                    makePainting(tag,bigType,smType)
                    tag.classList.toggle('active')
                    document.querySelector('#bg').classList.toggle('bg-hide')
                    
                })
            } 


            
        }
    }

    function makeTagElement(ele,type,smType){
        const img = document.createElement('img')
        img.classList.add('tag-ele')
        let imgTypes=[]
        console.log(type);
        switch(type){
            case 1:
                imgTypes= ['tree','sun','fog']
                break;
            case 2:
                imgTypes= ['sun','mountain']
                break;
            case 3:
                imgTypes= ['water','mountain']
                break;
            case 4:
                imgTypes= ['cloud','fog','cloud']
                break;
            default:
                imgTypes = ['mountain']
                break;
        }
        
        let ranType = imgTypes[Math.floor(Math.random()*imgTypes.length)]
        let t = {x:0,y:0}
        switch(ranType){
            case 'tree':
                t.x = Math.random()*50
                t.y = Math.random()*100*pn()
                img.style.bottom = 20
                break;
            case 'sun':
                t.x = Math.random()*100*pn()
                t.y = -100
                break;
            case 'mountain':
                t.x = Math.random()*100*pn()
                t.y =Math.random()*200*pn()
                img.style.bottom = 0
                break;
            case 'cloud':
                t.x = Math.random()*100*pn()
                t.y = -100 + Math.random()*30*pn()
                break;
            case 'fog':
                t.x = Math.random()*100*pn()
                t.y = -100
                break;
        }
        img.src = `./300w/${ranType}${Math.floor(Math.random()*3+1)}.png`
        img.style.transform = `translate(${t.x}px,${t.y}px)`

        ele.appendChild(img)

    }

    

    function makePainting(ele,type,smType){
        
        let haveSun = false
        for(let i=0;i<20;i++){
            const img = document.createElement('img')
            img.classList.add('tag-colored-ele')
            let imgTypes=[]
            console.log(type);
            switch(type){
                case 1:
                    imgTypes= ['tree','sun','cloud']
                    break;
                case 2:
                    imgTypes= ['sun','water','water']
                    break;
                case 3:
                    imgTypes= ['water','water','mountain']
                    break;
                case 4:
                    imgTypes= ['cloud','fog','sun','cloud']
                    break;
                default:
                    imgTypes = ['mountain']
                    break;
            }
            
            let ranType = imgTypes[Math.floor(Math.random()*imgTypes.length)]
            
            
            let t = {x:0,y:0}
            img.style.zIndex = 3
            let paintedSun = false
            switch(ranType){
                case 'tree':
                    t.x = Math.random()*850*pn()
                    t.y = Math.random()*30*pn()+30
                    img.style.bottom = 0 
                    img.style.width = Math.random()*300+100 + 'px'
                    break;
                case 'sun':
                    t.x = Math.random()*100*pn()
                    t.y = -100
                    paintedSun = true
                    img.style.zIndex = 2
                    img.style.width = Math.random()*300+300 + 'px'
                    break;
                case 'mountain':
                    t.x = Math.random()*700*pn()
                    t.y =Math.random()*200*pn()+50
                    img.style.bottom = 0
                    break;
                case 'cloud':
                    t.x = Math.random()*800*pn()
                    t.y = -100 + Math.random()*30*pn()
                    img.style.width = Math.random()*100-50+ 'px'
                    break;
                case 'fog':
                    t.x = Math.random()*800*pn()
                    img.style.zIndex = Math.random()>0.5 ? 1:3
                    img.style.width = Math.random()*200-100+ 'px'
                    t.y = -100
                    break;
                case 'water':
                    img.style.bottom = 0
                    t.x = Math.random()*800*pn()
                    t.y = 50
                    break;
            }
            img.src = `./colored/${ranType}${Math.floor(Math.random()*3+1)}.png`
            img.style.transform = `translate(${t.x}px,${t.y}px)`
            if(!paintedSun||!haveSun){
                ele.appendChild(img)
            }
            if(paintedSun) haveSun = true
            
        }
    }

    document.querySelector('#save').onclick=()=>{
        
        window.print()
    }

    document.querySelector('#again').onclick=()=>{
        window.history.go(0)
    }

    
    desc.onclick=()=>{
        desc.classList.toggle('desc-hide')
    }



}




