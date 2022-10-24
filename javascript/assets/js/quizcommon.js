        // 모달
    const modalBtn = document.querySelector(".modal__btn");
    const modalClose = document.querySelector(".modal__close .close");
    const modalCont = document.querySelector(".modal__cont");

    modalBtn.addEventListener("click", () => {
        modalCont.classList.add("show");
        modalCont.classList.remove("hide");
        modalClose.classList.remove("hide");
        modalClose.classList.add("show");
        modalBtn.classList.add("active");
    })
    modalClose.addEventListener("click", () => {
        modalClose.classList.add("hide");
        modalCont.classList.add("hide");
        modalBtn.classList.remove("active");

    })



    // 탭 메뉴
    const tabBtn = document.querySelectorAll(".modal__box .tabs > div");
    const tabCont = document.querySelectorAll(".modal__box .cont > div")

    tabBtn.forEach((element, index) => {
        element.addEventListener("click", (event)=>{            
            event.preventDefault();
            
            tabBtn.forEach(el => {
                el.classList.remove("active");
            })
            element.classList.add("active");
            
            tabCont.forEach(div => {
                div.style.display = "none";
            });
            tabCont[index].style.display = "block";     
        });
    });