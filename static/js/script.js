const likeHeart = document.querySelectorAll('.liked')

likeHeart.forEach((heart) => {
    heart.addEventListener('click', (e) => {
        const id = e.target.dataset.id
        return axios.post('/like' , {id: id})
        .then((res) => {
            if (res.status == 200){
                heart.src="/static/images/like.icon.invert.png"
            } else {
                heart.src="/static/images/like.icon.png"
            }
        })
    })
})