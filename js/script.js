'use strict'
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
{
    // Wyświetlanie artykułów po kliknięciu
    const titleClickHandler = function(event){
        /* zawsze to dadać przy funkcjach - handlerach - po kliknięciu */
        const clickedElement = this;

        console.log('Link was clicked!');
        console.log(event);

        event.preventDefault();

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement); // console.log('clickedElement (with plus): ' + clickedElement);
        clickedElement.classList.add('active');
        
        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleName = clickedElement.getAttribute('href');
        console.log('Href attribute: ', articleName);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const clickedArticle = document.querySelector('.posts ' + articleName);
        console.log('clickedArticle: ', clickedArticle);

        /* [DONE] add class 'active' to the correct article */
        clickedArticle.classList.add('active');
    }

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}
{
    // Generowanie listy tytułów

}