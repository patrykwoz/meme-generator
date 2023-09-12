console.log("I'm here");


const memeForm = document.querySelector('#add-meme-form');
const memeHolder = document.querySelector('#insert-memes');
const existingMemes = document.querySelectorAll('.created-meme');

existingMemes.forEach(exMeme => {
    exMeme.addEventListener('mouseenter', function(event){
        handleMemeEnter(event);
    });
    exMeme.addEventListener('mouseleave', function(event){
        handleMemeLeave(event);
    });
    exMeme.addEventListener('click', function(event){
        handleMemeClick(event);
    });
});



memeForm.addEventListener('submit', function(event){
    event.preventDefault();
    
    const imageURL = event.target.querySelector('#image-url').value;
    const textTop = event.target.querySelector('#text-top').value;
    const textBottom = event.target.querySelector('#text-bottom').value;
    
    newMemeDiv(memeHolder, imageURL, textTop, textBottom);
    this.reset();


});

function newMemeDiv(el, url, textTop, textBottom) {
    const newDiv = document.createElement('div');
    const h3Top = document.createElement('h3');
    const h3Bottom = document.createElement('h3');

    // Create a new Image object to load the image
    const imageLoader = new Image();

    imageLoader.onload = function() {
        // Calculate the aspect ratio
        const aspectRatio = this.width / this.height;

        // Assuming you set a fixed width, calculate height based on the aspect ratio
        const fixedWidth = 300;  // You can adjust this value as needed
        const computedHeight = fixedWidth / aspectRatio;
        newDiv.classList.add('created-meme');

        newDiv.style.width = `${fixedWidth}px`;
        newDiv.style.height = `${computedHeight}px`;

        // Now you can set the image as the background for the div
        newDiv.style.backgroundImage = `url(${url})`;
        

        // Append the text elements and add the new div to the parent element
        newDiv.appendChild(h3Top);
        newDiv.appendChild(h3Bottom);

        newDiv.addEventListener('mouseenter', function(event){
            handleMemeEnter(event);
        });
        newDiv.addEventListener('mouseleave', function(event){
            handleMemeLeave(event);
        });

        newDiv.addEventListener('click', function(event){
            handleMemeClick(event);
        });


        el.appendChild(newDiv);
    };

    // Trigger the image loading process
    imageLoader.src = url;

    h3Top.innerText = textTop;
    h3Top.classList.add('h3-top');
    h3Bottom.innerText = textBottom;
    h3Bottom.classList.add('h3-bottom');
}

function newDeleteDiv(el) {
    const newDiv = document.createElement('div');
    const h3Del = document.createElement('h3');
    newDiv.classList.add('delete-meme-hover');
    h3Del.innerHTML = "Click<br>to<br>Delete";

    newDiv.appendChild(h3Del);

    el.appendChild(newDiv);

}


function handleMemeEnter(e){
    newDeleteDiv(e.target);
}

function handleMemeLeave(e){
    const delScreen = e.target.querySelector('.delete-meme-hover');
    delScreen.remove();
}

function handleMemeClick(e){
    if (e.target.tagName === 'H3'){
        e.target.parentElement.parentElement.remove();
    } else if (e.target.tagName === 'DIV'){
        e.target.parentElement.remove();
    }

}