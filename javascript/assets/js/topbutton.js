window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    // scrollTop > ( 문서 전체높이 - 브라우저 높이 )
    if (scrollTop >= document.body.scrollHeight - (window.innerHeight+window.innerHeight/3)) {
        document.querySelector(".top__button").classList.add("show");
    } else {
        document.querySelector(".top__button").classList.remove("show");
    }
});

// top버튼누르면 맨위로
document.querySelector(".top__button").addEventListener("click", () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
});